import { useGetStudentsByKeyword } from "@/entities/students/queries";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const result = useGetStudentsByKeyword(debouncedQuery).data?.data || [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    query,
    onChange,
    result,
  };
}