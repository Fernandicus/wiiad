import { InputTextFieldItem } from "./InputTextFieldItem";

type InputProps = Parameters<typeof InputTextFieldItem>[0] & {
  label: string;
  errorMessage?: string;
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
  } = props;

  return (
    <div className="space-y-2 w-full">
      <label className="font-bold">
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
