import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-5 py-4 border-b border-border ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardBody = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-5 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`bg-card border border-border text-card-foreground rounded-xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody };
