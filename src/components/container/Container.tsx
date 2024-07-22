import { ReactNode } from 'react';
import './Container.css';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;

//
