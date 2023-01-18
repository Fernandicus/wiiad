import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { ChangeEvent, useState } from "react";
import { SegmentComponent } from "./SegmentComponent";

interface IAdSegmentsProps {
  onChange(e: ChangeEvent<any>): void;
  inputName: string;
  segmentsSelected: string[];
}

export const AdSegmentsComponent = ({
  inputName,
  onChange,
  segmentsSelected,
}: IAdSegmentsProps) => {
  return (
    <div className="space-y-2 ">
      <label className="font-bold">
        A qué nichos va dirigido este anuncio? {" "}
        <span
          className={`font-medium text-sm ${
            segmentsSelected.length > 3 ? "text-red-500" : "text-gray-500"
          }`}
        >
          ({segmentsSelected.length}/3)
        </span>
      </label>
      <div className=" ">
        <ul className="flex items-center justify-between flex-wrap ">
          {AdSegments.withAllAvailables().segments.map((segment) => {
            return (
              <SegmentComponent
                inputName={inputName}
                selectedSegments={segmentsSelected}
                onChange={onChange}
                segment={segment}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
