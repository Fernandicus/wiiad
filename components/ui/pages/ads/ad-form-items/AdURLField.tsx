import { ErrorLabel } from "./ErrorLabel";
import { IFieldComponentProps } from "./interfaces/IFieldComponentProps";

export const AdURLField = (params: IFieldComponentProps) => {
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
