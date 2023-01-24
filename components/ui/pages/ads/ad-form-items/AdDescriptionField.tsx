import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { ChangeEvent } from "react";
import { ErrorLabel } from "./ErrorLabel";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";

interface IAdDescriptionField {
  title: string;
  inputName: string;
  hasError: boolean;
  errorText: string;
  onChange(e: ChangeEvent<any>): void;
  value: string;
}

export const AdDescriptionField = (params: IAdDescriptionField) => {
  const { errorText, hasError, inputName, onChange, title, value } = params;
  return (
    <div className="space-y-2">
      <MaxLengthCounterLabel
        title={title}
        length={value.length}
        maxLength={AdDescription.maxLength}
      />
      <textarea
        required
        placeholder="Description"
        rows={4}
        onChange={onChange}
        value={value}
        name={inputName}
        className="p-2 border border-gray-300 rounded-md px-2 block w-full"
      ></textarea>
      {hasError && <ErrorLabel errorText={errorText} />}
    </div>
  );
};
