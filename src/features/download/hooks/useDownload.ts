import { useDownloadExcel } from "@/entities/histories/mutations";
import { useDateStore } from "@/features/filter/stores/date";

export const useDownload = () => {
  const { mutateAsync: downloadExcel } = useDownloadExcel();
  const { date } = useDateStore();

  const handleDownloadExcel = async () => {
    const { data } = await downloadExcel(date);
    const { url } = data;

    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return handleDownloadExcel
};
