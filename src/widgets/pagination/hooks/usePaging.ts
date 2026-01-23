import { useRouter } from "@cher1shrxd/loading";

export const usePaging = () => {
  const router = useRouter();

  const onPageChange = (newPage: number) => {
    router.push(newPage !== 0 ? `/absences?page=${newPage}` : "/absences");
  };

  return onPageChange;
}