import { IconProps } from "../types/icon-props";

const TrashIcon = ({ className, size = 16 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M4.33333 14C3.96667 14 3.65278 13.8694 3.39167 13.6083C3.13056 13.3472 3 13.0333 3 12.6667V4H2.33333V2.66667H5.66667V2H10.3333V2.66667H13.6667V4H13V12.6667C13 13.0333 12.8694 13.3472 12.6083 13.6083C12.3472 13.8694 12.0333 14 11.6667 14H4.33333ZM11.6667 4H4.33333V12.6667H11.6667V4ZM5.66667 11.3333H7V5.33333H5.66667V11.3333ZM9 11.3333H10.3333V5.33333H9V11.3333Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TrashIcon;
