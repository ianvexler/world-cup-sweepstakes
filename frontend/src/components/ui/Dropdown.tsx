import classNames from 'classnames';

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  id?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

const Dropdown = ({
  id,
  value,
  options,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: DropdownProps) => {
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(
        'h-10 w-full min-w-40 cursor-pointer rounded-md border border-border bg-card px-3 text-sm text-black shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
