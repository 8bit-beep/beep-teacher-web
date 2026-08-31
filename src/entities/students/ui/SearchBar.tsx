"use client";

import SearchIcon from "@/shared/icons/SearchIcon";

interface Props {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ query, onChange }: Props) => {
  return (
    <div className="w-full h-11 bg-static-white rounded-large shadow-modal flex items-center px-5 gap-3">
      <SearchIcon className="m-1.75 text-greyscale-40" />
      <input
        type="text"
        className="flex-1 border-none outline-none bg-transparent h-full text-body text-static-black placeholder:text-greyscale-40"
        placeholder="검색하기"
        value={query}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
