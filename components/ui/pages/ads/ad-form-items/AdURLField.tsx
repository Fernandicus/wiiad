import { ChangeEvent } from "react";
import { ErrorLabel } from "./ErrorLabel";

interface IAdURLFieldProps {
  title: string;
  onChange(e: ChangeEvent<any>): void;
  value: string;
  inputName: string;
  hasError: boolean;
  errorText: string;
}

export const AdURLField = (params: IAdURLFieldProps) => {
  const { errorText, hasError, inputName, onChange, title, value } = params;
  return (
    <div className="space-y-2">
      <label className="font-bold">{title}</label>
      <input
        required
        type="text"
        placeholder="https://..."
        onChange={onChange}
        value={value}
        name={inputName}
        className="border border-gray-300 rounded-md px-2 block w-full h-10"
      />
      {hasError && <ErrorLabel errorText={errorText} />}
    </div>
  );
};
