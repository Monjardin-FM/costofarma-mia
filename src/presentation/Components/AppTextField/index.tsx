import clsx from "clsx";

export type AppTextFieldProps = {
  placeholder: string;
  maxLength?: number;
  dataOpenCard?: any;
  name: string;
  onChange: (e: any) => void;
  value: any;
  className: string;
  disabled?: boolean;
  type?: string;
  onBlur?: any;
  onFocus?: any;
  inputMode?:
    | "decimal"
    | "email"
    | "numeric"
    | "search"
    | "tel"
    | "text"
    | "url";
};

export const AppTextField = ({
  placeholder,
  dataOpenCard,
  name,
  onChange,
  value,
  className,
  disabled = false,
  type = "text",
  onBlur,
  onFocus,
  inputMode,
  maxLength,
}: AppTextFieldProps) => {
  return (
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      min={0}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      data-openpay-card={dataOpenCard}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={clsx(
        className,
        "h-9 rounded-md border border-gray-300 p-2 text-base text-gray-600 font-normal max-sm:text-xs"
      )}
      inputMode={inputMode}
    />
  );
};
