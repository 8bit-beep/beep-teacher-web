"use client";

import { Absence } from "@/entities/absences/types";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import { useRouter } from "@cher1shrxd/loading";
import { Button, DatePicker, Dropdown, DropdownItem, modal } from "@bds-web/ui";
import { useState } from "react";
import { useGetAbsenceReason } from "../hooks/useGetAbsenceReason";
import {
  getCreateAbsenceToastState,
  useCreateAbsenceMutation,
} from "@/entities/absences/mutations";

interface Props {
  selectedStudents: number[];
  targetStudents: Absence["targetStudents"];
  onAdded: (absence: Absence) => void;
}

const AddAbsenceReasonModal = ({
  selectedStudents,
  targetStudents,
  onAdded,
}: Props) => {
  const router = useRouter();
  const { options } = useGetAbsenceReason();
  const { mutateAsync } = useCreateAbsenceMutation();
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(null);
  const [reason, setReason] = useState("");
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const [isPending, setIsPending] = useState(false);

  const submit = async () => {
    if (!selectedType) {
      toast.warning(
        "조건 미충족",
        "결석 사유를 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    if (!reason.trim()) {
      toast.warning(
        "조건 미충족",
        "상세 결석 사유를 작성해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    const startDate = parseDate(startAt);
    const endDate = parseDate(endAt);

    setIsPending(true);

    try {
      const response = await mutateAsync({
        userIds: selectedStudents,
        startDate,
        endDate,
        reason: reason.trim(),
        typeId: Number(selectedType.value),
        checkpoints: [],
      });

      if (response.data.absenceId !== null) {
        onAdded({
          absenceId: response.data.absenceId,
          isGrouped: selectedStudents.length > 1,
          targetStudents,
          startDate,
          endDate,
          checkpoints: [],
          reason: reason.trim(),
          typeId: Number(selectedType.value),
        });
      }

      const toastState = getCreateAbsenceToastState(
        response.data.skippedUserIds,
        selectedStudents.length,
      );

      if (toastState.type === "success") {
        toast.success(
          "결석 추가 완료",
          "결석 사유가 정상적으로 추가되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      } else {
        toast.warning(
          toastState.title,
          toastState.description,
          TOAST_ISSUE_DURATION,
        );
      }

      if (response.data.absenceId === null) {
        toast.warning(
          "목록 갱신 필요",
          "생성은 처리됐지만 목록 반영을 위해 상세 및 수정을 다시 열어주세요.",
          TOAST_ISSUE_DURATION,
        );
      }

      router.refresh();
      modal.close();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col gap-0.5 items-start">
        <span className="text-caption1 text-static-black">결석 사유</span>
        <Dropdown
          onSelect={setSelectedType}
          options={options}
          selected={selectedType}
          dropdownSize="large"
        />
      </div>
      <textarea
        className="w-full h-24 p-4 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
        placeholder="상세한 결석 사유를 작성해주세요. (500자 이내)"
        maxLength={500}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="w-full flex flex-col gap-0.5">
        <span className="text-caption1 text-static-black">결석 기간</span>
        <div className="w-full flex items-center gap-2.5 justify-between">
          <DatePicker
            date={startAt}
            onChangeDate={setStartAt}
            title="시작일 선택"
          />
          <span className="text-caption1 text-static-black">~</span>
          <DatePicker
            date={endAt}
            onChangeDate={setEndAt}
            title="종료일 선택"
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <Button
          buttonSize="large"
          buttonType="ghost"
          onClick={() => modal.close()}
          style={{ flex: 1 }}
        >
          취소
        </Button>
        <Button
          buttonSize="large"
          buttonType="primary"
          onClick={submit}
          disabled={isPending || !selectedType || !reason.trim()}
          style={{ flex: 1 }}
        >
          추가
        </Button>
      </div>
    </div>
  );
};

export default AddAbsenceReasonModal;
