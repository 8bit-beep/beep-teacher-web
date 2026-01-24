"use client";

import { Shift } from "@/entities/shifts/types";
import { Button, modal } from "@bds-web/ui";
import DetailModal from "./DetailModal";

interface Props {
  data: Shift;
}

const Detail = ({ data }: Props) => {
  return (
    <Button
      buttonSize="small"
      buttonType="text"
      onClick={() =>
        modal.open({ title: "신청 내용", content: <DetailModal data={data} /> })
      }>
      신청 내용 보기
    </Button>
  );
};

export default Detail;
