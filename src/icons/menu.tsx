// src/components/icons/MenuIcon.tsx
import React from 'react';

type MenuIconProps = {
  className?: string;
  height?: number;
  width?: number;
};

const MenuIcon: React.FC<MenuIconProps> = ({
  className,
  height = 24,
  width = 24,
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
    width={width}
  >
    <path
      d="m0 0h24v24h-24z"
      fill="none"
    />
    <path d="m3 18h18v-2h-18zm0-5h18v-2h-18zm0-7v2h18v-2z" />
  </svg>
);

export default MenuIcon;
