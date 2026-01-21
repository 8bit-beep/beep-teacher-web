import { IconProps } from "../types/icon-props";

const ChevronIcon = ({
  className,
  size,
  rotate = 90,
}: IconProps & { rotate?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}>
      <mask
        id="mask0_13542_2460"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}>
        <rect
          y={size}
          width={size}
          height={size}
          rx="2"
          transform="rotate(-90 0 16)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_13542_2460)">
        <path
          d="M14.6666 5.33333L7.99998 12L1.33331 5.33333L2.51665 4.15L7.99998 9.63333L13.4833 4.15L14.6666 5.33333Z"
          fill="currentColor"
        />
        <path
          d="M14.6666 5.33333L7.99998 12L1.33331 5.33333L2.51665 4.15L7.99998 9.63333L13.4833 4.15L14.6666 5.33333Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M14.6666 5.33333L7.99998 12L1.33331 5.33333L2.51665 4.15L7.99998 9.63333L13.4833 4.15L14.6666 5.33333Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ChevronIcon;
