import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={classNames(
        'w-full p-2 border border-border bg-field text-field-foreground placeholder:text-field-placeholder rounded-md focus:outline-none focus:ring-1 focus:border-transparent',
        className
      )}
      {...props}
    />
  );
};

export default Input;
