import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Loader = ({ size = 15, className = '', ...props }: LoaderProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-muted ${className}`}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span
        className={`h-${size} w-${size} animate-spin rounded-full border-4 border-border border-t-primary`}
        aria-hidden="true"
      />
    </div>
  );
};

export default Loader;
