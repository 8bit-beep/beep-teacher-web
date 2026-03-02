"use client";

import { Shift } from "@/entities/shifts/types";
import { Button, modal } from "@bds-web/ui";
import DetailModal from "./DetailModal";

interface Props {
  data: Shift;
}

const Detail = ({ data }: Props) => {
  return (
    <>
      <div className="hidden lg:block">
        <Button
            buttonSize="small"
            buttonType="primary"
            onClick={() =>
              modal.open({ title: "신청 내용", content: <DetailModal data={data} /> })
            }>
            신청 내용 보기
        </Button>
      </div>
      <p className="lg:hidden w-full text-right text-grayscale-70 text-body cursor-pointer"
        onClick={() =>
          modal.open({ title: "신청 내용", content: <DetailModal data={data} /> })
        }>
        상세 보기
      </p>
    </>
  );
};

export default Detail;
