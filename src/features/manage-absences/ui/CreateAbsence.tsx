"use client";

import { Button, modal } from "@bds-web/ui";
import CreateAbsenceModal from "./CreateAbsenceModal";

const CreateAbsence = () => {
  return (
    <Button
      buttonSize="medium"
      buttonType="primary"
      onClick={() =>
        modal.open({
          title: "결석자 생성하기",
          content: <CreateAbsenceModal />,
        })
      }>
      결석자 생성
    </Button>
  );
};

export default CreateAbsence;
