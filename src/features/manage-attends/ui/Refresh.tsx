"use client";

import { Button } from "@bds-web/ui";
import { useRefresh } from "../hooks/useRefresh";

const Refresh = () => {
  const handleRefresh = useRefresh();

  return (
    <Button buttonSize="small" buttonType="ghost" onClick={handleRefresh}>
      새로고침
    </Button>
  );
};

export default Refresh;
