import { ReactNode } from 'react';
import './Container.css';

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
