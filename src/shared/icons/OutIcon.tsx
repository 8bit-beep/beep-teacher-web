import { IconProps } from "../types/icon-props";

const OutIcon = ({ className, size }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M1.33333 12C0.966667 12 0.652778 11.8694 0.391667 11.6083C0.130556 11.3472 0 11.0333 0 10.6667V1.33333C0 0.966667 0.130556 0.652778 0.391667 0.391667C0.652778 0.130556 0.966667 0 1.33333 0H6V1.33333H1.33333V10.6667H6V12H1.33333ZM8.66667 9.33333L7.75 8.36667L9.45 6.66667H4V5.33333H9.45L7.75 3.63333L8.66667 2.66667L12 6L8.66667 9.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default OutIcon;
