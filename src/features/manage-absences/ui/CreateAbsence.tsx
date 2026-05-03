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
          title: "외박자 추가하기",
          content: <CreateAbsenceModal />,
        })
      }>
      외박자 추가하기
    </Button>
  );
};

export default CreateAbsence;
