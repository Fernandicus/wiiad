import { InputTextFieldItem } from "./InputTextFieldItem";

type FontWitdth = "font-bold" | "font-normal" | "font-semibold" | "font-medium"

type InputProps = Parameters<typeof InputTextFieldItem>[0] & {
  label: string;
  errorMessage?: string;
  fontWidth?:FontWitdth;
};

export const InputTextField = (props: InputProps) => {
  const {
    errorMessage,
    label,
    maxLength,
    name,
    onChange,
    placeholder,
    required,
    type,
    value,
    hasError,
    fontWidth = "font-bold"
  } = props;

  return (
    <div className="space-y-2 w-full">
      <label className={`${fontWidth}`}>
        {label}
        {errorMessage && (
          <span className="text-red-500 text-xs font-normal">
            {errorMessage}
          </span>
        )}
      </label>
      <InputTextFieldItem
        hasError={hasError}
        required={required}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};
