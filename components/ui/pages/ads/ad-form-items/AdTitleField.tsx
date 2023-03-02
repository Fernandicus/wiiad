import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { ErrorLabel } from "./ErrorLabel";
import { IFieldComponentProps } from "./interfaces/IFieldComponentProps";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";

export const AdTitleField = (params: IFieldComponentProps) => {
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
