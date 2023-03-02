import { HTMLInputTypeAttribute, ChangeEvent, ChangeEventHandler } from "react";

interface InputProps {
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  name?: string;
  maxLength?: number;
  hasError?:boolean;
}

export const InputTextFieldItem = (props: InputProps) => {
  const {
    required = false,
    type = "text",
    onChange,
    maxLength,
    name,
    placeholder,
    value,
    hasError = false
  } = props;

  return (
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      maxLength={maxLength}
      className={`rounded-md px-2 block w-full h-10 border ${
        hasError ? "border-red-300" : "border-gray-300 caret-sky-600 outline-2 outline-sky-500"
      }`}
    />
  );
};