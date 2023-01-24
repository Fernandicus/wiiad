import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { ChangeEvent, useState } from "react";
import { ErrorLabel } from "./ErrorLabel";
import { MaxLengthCounterLabel } from "./MaxLengthCounterLabel";
import { SegmentCheckBox } from "./SegmentCheckBox";
import { SegmentsCheckBoxList } from "./SegmentsCheckBoxList";

interface IAdSegmentsFieldProps {
  onChange(e: ChangeEvent<any>): void;
  inputName: string;
  segmentsSelected: string[];
  errorText: string;
  hasError:boolean;
}

export const AdSegmentsField = ({
  inputName,
  onChange,
  segmentsSelected,
  errorText,
  hasError
}: IAdSegmentsFieldProps) => {
  const segments = AdSegments.withAllAvailables().segments;
  const segmentsLength = segmentsSelected.length;

  return (
    <div className="space-y-2 ">
      <MaxLengthCounterLabel
        title="A qué nichos va dirigido este anuncio?"
        length={segmentsLength}
        maxLength={3}
      />
      <SegmentsCheckBoxList
        inputName={inputName}
        onChange={onChange}
        segments={segments}
        segmentsSelected={segmentsSelected}
      />
      {hasError && <ErrorLabel errorText={errorText} />}
    </div>
  );
};
