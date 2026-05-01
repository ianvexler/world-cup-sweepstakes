import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Loader = ({ size = 40, className = '', ...props }: LoaderProps) => {
  const px = `${size}px`;

  return (
    <div
      className={`flex items-center justify-center gap-3 text-muted ${className}`}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span
        className="shrink-0 animate-spin rounded-full border-[0.2em] border-border border-t-primary"
        style={{ width: px, height: px }}
        aria-hidden="true"
      />
    </div>
  );
};

export default Loader;
