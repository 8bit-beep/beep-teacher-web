"use client";

import { Button } from "@bds-web/ui";
import { useRefresh } from "../../../shared/hooks/useRefresh";

interface Props {
  size?: "small" | "medium";
}

const Refresh = ({ size = "small" }: Props) => {
  const handleRefresh = useRefresh();

  return (
    <Button buttonSize={size} buttonType="ghost" onClick={handleRefresh}>
      새로고침
    </Button>
  );
};

export default Refresh;
