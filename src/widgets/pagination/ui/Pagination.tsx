"use client";

import { usePaging } from "../hooks/usePaging";
import PageItem from "./PageItem";

interface Props {
  totalPages: number;
  currentPage?: number;
}

const Pagination = ({ totalPages, currentPage }: Props) => {
  const onPageChange = usePaging();

  return (
    <div className="w-full h-12 mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PageItem
          number={page}
          isActive={page - 1 === (currentPage || 0)}
          onClick={onPageChange}
          key={page}
        />
      ))}
    </div>
  );
};

export default Pagination;
