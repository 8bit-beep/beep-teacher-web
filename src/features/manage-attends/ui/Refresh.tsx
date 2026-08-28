"use client";

import { Button } from "@beep-ds/ui";
import { useRefresh } from "../../../shared/hooks/useRefresh";

const Refresh = () => {
  const handleRefresh = useRefresh();

  return (
    <Button buttonSize="small" buttonType="ghost" onClick={handleRefresh}>
      새로고침
    </Button>
  );
};

export default Refresh;
