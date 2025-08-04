import { useContext } from "react";
import clsx from "clsx";
import enUS from "date-fns/locale/en-US";
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { AppInput, AppInputProps } from "../AppInput";
import { AppFormContext } from "../AppForm";
// import enUS, { enUS } from "date-fns/locale/en-US";

registerLocale("enUS", enUS);

export type AppDatePickerProps = ReactDatePickerProps & AppInputProps;

const AppDatePicker = ({
  leftIcon,
  rightIcon,
  className,
  required,
  colorSchema = "gray",
  wrapperClassName,
  ...props
}: AppDatePickerProps) => {
  const { isRequired } = useContext(AppFormContext);
  return (
    <DatePicker
      locale="enUS"
      dateFormat="dd/MM/yyyy"
      className={clsx("form-input h-10", className)}
      required={isRequired || required}
      wrapperClassName={clsx("w-full ", wrapperClassName)}
      {...props}
    />
  );
};

export default AppInput(AppDatePicker);
