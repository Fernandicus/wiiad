import { ChangeEvent } from "react";
import { SegmentCheckBox } from "./SegmentCheckBox";

interface ISegmentsCheckBoxListParams {
  segments: string[];
  inputName: string;
  segmentsSelected: string[];
  onChange(e: ChangeEvent<any>): void;
}

export const SegmentsCheckBoxList = (params: ISegmentsCheckBoxListParams) => {
  const { inputName, onChange, segments, segmentsSelected } = params;
  return (
    <ul className="flex items-center justify-between flex-wrap ">
      {segments.map((segment, index) => {
        return (
          <div key={index}>
            <SegmentCheckBox
              inputName={inputName}
              selectedSegments={segmentsSelected}
              onChange={onChange}
              segment={segment}
            />
          </div>
        );
      })}
    </ul>
  );
};
