import { IconProps } from "../types/icon-props";

const OkIcon = ({ className, size = 16 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        fill="currentColor"
      />
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M11.5333 4.8667L7.00001 9.40003L5.13335 7.53337L4.20001 8.4667L7.00001 11.2667L12.4667 5.80003L11.5333 4.8667Z"
        fill="white"
      />
    </svg>
  );
};

export default OkIcon;
