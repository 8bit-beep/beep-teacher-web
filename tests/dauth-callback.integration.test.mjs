import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import net from "node:net";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

const findAvailablePort = async () =>
  new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Failed to allocate a test port"));
        return;
      }

      server.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });

const waitForServer = async (origin, serverProcess) => {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next server exited with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetch(`${origin}/login`);
      await response.body?.cancel();
      if (response.ok) return;
    } catch {
      // The development server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error("Timed out waiting for the Next server");
};

const createAccessToken = () => {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" }))
    .toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3_600 }),
  ).toString("base64url");

  return `${header}.${payload}.test-signature`;
};

test("DAuth callback sets both cookies and preserves access to /", async (t) => {
  const port = await findAvailablePort();
  const origin = `http://127.0.0.1:${port}`;
  const serverProcess = spawn(
    "pnpm",
    ["exec", "next", "dev", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        NEXT_PUBLIC_WEB_URL: origin,
        NEXT_PUBLIC_API_URL: `${origin}/unused-api`,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let serverOutput = "";
  serverProcess.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  serverProcess.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  t.after(() => {
    serverProcess.kill("SIGTERM");
  });

  try {
    await waitForServer(origin, serverProcess);

    const callbackUrl = new URL("/callback/dauth", origin);
    callbackUrl.searchParams.set("accessToken", createAccessToken());
    callbackUrl.searchParams.set("refreshToken", "integration-refresh-token");

    const callbackResponse = await fetch(callbackUrl, { redirect: "manual" });
    assert.equal(callbackResponse.status, 307);
    assert.equal(callbackResponse.headers.get("location"), `${origin}/`);

    const setCookies = callbackResponse.headers.getSetCookie();
    assert.equal(setCookies.length, 2);
    assert.ok(setCookies.some((cookie) => cookie.startsWith("accessToken=")));
    assert.ok(setCookies.some((cookie) => cookie.startsWith("refreshToken=")));

    const cookieHeader = setCookies
      .map((cookie) => cookie.split(";", 1)[0])
      .join("; ");
    const homeResponse = await fetch(`${origin}/`, {
      headers: { cookie: cookieHeader },
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });

    assert.notEqual(homeResponse.headers.get("location"), `${origin}/login`);
    await homeResponse.body?.cancel();

    const assertFailureRedirect = async (query, expectedReason) => {
      const failureUrl = new URL("/callback/dauth", origin);
      Object.entries(query).forEach(([key, value]) => {
        failureUrl.searchParams.set(key, value);
      });

      const response = await fetch(failureUrl, { redirect: "manual" });
      const location = new URL(response.headers.get("location"));
      const correlationId = response.headers.get("x-correlation-id");

      assert.equal(response.status, 307);
      assert.equal(location.origin, origin);
      assert.equal(location.pathname, "/login");
      assert.equal(location.searchParams.get("error"), "oauth");
      assert.equal(location.searchParams.get("reason"), expectedReason);
      assert.ok(correlationId);
      assert.equal(location.searchParams.get("correlationId"), correlationId);
    };

    await assertFailureRedirect(
      { refreshToken: "unused-refresh-token" },
      "missing_access_token",
    );
    await assertFailureRedirect(
      { accessToken: "unused-access-token" },
      "missing_refresh_token",
    );
    await assertFailureRedirect(
      { error: "access_denied" },
      "provider_access_denied",
    );
  } catch (error) {
    throw new Error(`${error.message}\nNext server output:\n${serverOutput}`);
  }
});
