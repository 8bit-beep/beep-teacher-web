import type { MouseEvent } from 'react';

interface Props {
    onClick: (e: MouseEvent) => void;
}

const ApprovalButton = ({ onClick }: Props) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        className="h-8 w-full bg-blue-light text-static-white text-caption2 rounded-small flex items-center justify-center gap-2.5 cursor-pointer">
        승인하기
      </button>
    );
  };
  
  export default ApprovalButton;