interface Props {
  onClose?: () => void;
  size?: number;
}

export const CloseIcon = ({ onClose, size = 12 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClose}
      style={{ cursor: onClose ? "pointer" : "default" }}
    >
      <path
        d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
        fill="currentColor"
      />
    </svg>
  );
};
