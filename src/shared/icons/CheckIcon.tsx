import { IconProps } from "../types/icon-props";

const CheckIcon = ({ className, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M10.4099 17.8538C10.0706 17.8538 9.73124 17.7407 9.50502 17.4014L4.30196 12.1983C3.7364 11.6328 3.7364 10.841 4.30196 10.2755C4.86751 9.70991 5.65928 9.70991 6.22483 10.2755L10.4099 14.4605L17.8752 6.99527C18.4407 6.42972 19.2325 6.42972 19.798 6.99527C20.3636 7.56082 20.3636 8.35259 19.798 8.91814L11.4279 17.2883C11.0886 17.7407 10.7492 17.8538 10.4099 17.8538Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;
