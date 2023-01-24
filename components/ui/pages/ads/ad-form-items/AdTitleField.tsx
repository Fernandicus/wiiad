import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { ChangeEvent } from "react";
import { ErrorLabel } from "./ErrorLabel";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";

interface IAdTitleFieldProps {
  title: string;
  inputName: string;
  hasError: boolean;
  errorText: string;
  onChange(e: ChangeEvent<any>): void;
  value: string;
}

export const AdTitleField = (params: IAdTitleFieldProps) => {
  const { errorText, hasError, inputName, title, onChange, value } = params;
  return (
    <div className="space-y-2">
      <MaxLengthCounterLabel
        title={title}
        length={value.length}
        maxLength={AdTitle.maxLength}
      />
      <input
        required
        type="text"
        placeholder="Title"
        onChange={onChange}
        value={value}
        name={inputName}
        maxLength={AdTitle.maxLength}
        className={`rounded-md px-2 block w-full h-10 border ${"border-gray-300"} `}
      />
      {hasError && <ErrorLabel errorText={errorText} />}
    </div>
  );
};
