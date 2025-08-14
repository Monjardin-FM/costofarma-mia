import clsx from "clsx";
type AppFormLabelProps = {
  label: string;
  className?: string;
};
export const AppFormLabel = ({ label, className }: AppFormLabelProps) => {
  return (
    <label
      className={clsx(
        className,
        "color-primary font-medium text-base  ml-1 max-sm:text-xs"
      )}
    >
      {label}
    </label>
  );
};
