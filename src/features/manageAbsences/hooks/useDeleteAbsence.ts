import { useDeleteAbsenceMutation } from "@/entities/absences/mutations";

export const useDeleteAbsence = (absenceId: number) => {
  const { mutateAsync } = useDeleteAbsenceMutation(absenceId);

  const deleteAbsence = async () => {
    await mutateAsync();
  };

  return deleteAbsence;
};
