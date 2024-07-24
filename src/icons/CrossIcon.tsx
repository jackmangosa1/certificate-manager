type CrossIconProps = {
  className?: string;
  height?: number;
  width?: number;
};

const CrossIcon: React.FC<CrossIconProps> = ({
  className,
  height = 24,
  width = 24,
}) => (
  <svg
    viewBox="0 0 352 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
    width={width}
  >
    <path d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0l-100.07 100.07-100.07-100.07c-12.28-12.28-32.19-12.28-44.48 0l-22.24 22.24c-12.28 12.28-12.28 32.19 0 44.48l100.07 100.07-100.07 100.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0l100.07-100.07 100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48z" />
  </svg>
);

export default CrossIcon;
