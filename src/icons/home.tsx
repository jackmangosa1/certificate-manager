// src/components/icons/HomeIcon.tsx
import React from 'react';

type HomeIconProps = {
  className?: string;
  height?: number;
  width?: number;
};

const HomeIcon: React.FC<HomeIconProps> = ({
  className,
  height = 24,
  width = 24,
}) => (
  <svg
    viewBox="0 0 576 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
    width={width}
  >
    <path d="m280.37 148.26 -184.37 151.85v163.89a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16v-95.71a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05l112.02.31a16 16 0 0 0 16-16v-164l-184.33-151.74a12.19 12.19 0 0 0 -15.3 0zm291.23 103.21-83.6-68.91v-138.51a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.61l-89.53-73.66a48 48 0 0 0 -61 0l-253.13 208.47a12 12 0 0 0 -1.6 16.9l25.5 31a12 12 0 0 0 16.91 1.63l235.22-193.74a12.19 12.19 0 0 1 15.3 0l235.23 193.74a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.93z" />
  </svg>
);

export default HomeIcon;
