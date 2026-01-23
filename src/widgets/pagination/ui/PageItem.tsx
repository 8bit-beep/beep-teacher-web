"use client";

interface Props {
  number: number;
  onClick: (page: number) => void;
  isActive: boolean;
}

const PageItem = ({ number, onClick, isActive }: Props) => {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-small text-center cursor-pointer ${
        isActive
          ? "bg-blue-light text-white"
          : "bg-white text-blue-light hover:bg-greyscale-10 border border-blue-light"
      }`}
      onClick={() => onClick(number - 1)}>
      <p className="text-body">{number}</p>
    </div>
  );
};

export default PageItem;
