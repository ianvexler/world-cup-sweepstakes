import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

type AlertVariant = 'primary' | 'secondary' | 'warning' | 'success' | 'danger';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  heading?: ReactNode;
}

const Alert = ({
  variant = 'primary',
  heading,
  children,
  className = '',
  ...props
}: AlertProps) => {
  const variantStyles: Record<AlertVariant, string> = {
    primary: 'bg-primary text-primary-foreground border border-primary',
    secondary: 'bg-card text-card-foreground border border-border',
    warning: 'bg-amber-500 text-amber-500 border border-amber-500',
    success: 'bg-emerald-500 text-emerald-500 border border-emerald-500',
    danger: 'bg-danger text-danger-foreground border border-danger',
  };

  return (
    <div
      role="alert"
      className={classNames(
        'w-full rounded-md border px-4 py-3',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {heading ? <p className="mb-1 font-semibold">{heading}</p> : null}
      {children ? <div className="text-sm">{children}</div> : null}
    </div>
  );
};

export default Alert;
