import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { ErrorLabel } from "./ErrorLabel";
import { IFieldComponentProps } from "./interfaces/IFieldComponentProps";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";

export const AdDescriptionField = (params: IFieldComponentProps) => {
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
