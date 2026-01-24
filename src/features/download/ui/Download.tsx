"use client";

import { Button } from "@bds-web/ui";
import { useDownload } from "../hooks/useDownload";

const Download = () => {
  const handleDownloadExcel = useDownload();

  return (
    <Button
      buttonSize="large"
      buttonType="primary"
      showIcon
      onClick={handleDownloadExcel}>
      엑셀 다운로드
    </Button>
  );
};

export default Download;
