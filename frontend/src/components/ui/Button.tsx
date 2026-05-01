import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) => {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-primary-foreground border border-primary hover:opacity-90 focus-visible:ring-primary',
    secondary:
      'bg-card text-card-foreground border border-border hover:opacity-90 focus-visible:ring-border',
    ghost:
      'bg-transparent text-foreground border border-transparent hover:bg-card focus-visible:ring-border',
    danger:
      'bg-danger text-danger-foreground border border-danger hover:opacity-90 focus-visible:ring-danger',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  };

  return (
    <button
      type={type}
      className={classNames(
        'cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
