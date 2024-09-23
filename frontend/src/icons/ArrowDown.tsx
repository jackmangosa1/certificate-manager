import React from 'react';

type ArrowIconProps = {
  className?: string;
  height?: number;
  width?: number;
};

const ArrowIcon: React.FC<ArrowIconProps> = ({
  className,
  height = 24,
  width = 24,
}) => (
  <svg
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="m8.12 9.29 3.88 3.88 3.88-3.88c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0l-4.59-4.59c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
  </svg>
);

export default ArrowIcon;
