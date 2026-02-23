
# 1. Build stage
FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@10.23.0 --activate

# 환경변수 전달
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NEXT_PUBLIC_WEB_URL
ENV NEXT_PUBLIC_WEB_URL=${NEXT_PUBLIC_WEB_URL}

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# 2. Production image
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Next.js standalone output 및 정적 파일 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# 환경변수 및 포트 설정
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]