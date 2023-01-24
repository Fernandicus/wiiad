import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { ErrorLabel } from "./ErrorLabel";
import { IFieldComponentProps } from "./interfaces/IFieldComponentProps";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";
import { SegmentsCheckBoxList } from "./SegmentsCheckBoxList";

export const AdSegmentsField = (params: IFieldComponentProps<string[]>) => {
  const { value, title, inputName, onChange, errorText, hasError } = params;
  const segments = AdSegments.withAllAvailables().segments;
  const segmentsLength = value.length;

  return (
    <div className="space-y-2 ">
      <MaxLengthCounterLabel
        title={title}
        length={segmentsLength}
        maxLength={3}
      />
      <SegmentsCheckBoxList
        inputName={inputName}
        onChange={onChange}
        segments={segments}
        segmentsSelected={value}
      />
      {hasError && <ErrorLabel errorText={errorText} />}
    </div>
  );
};
