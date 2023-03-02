import { ChangeEvent, useState } from "react";

interface ISegmentCheckBoxProps {
  selectedSegments: string[];
  segment: string;
  inputName: string;
  onChange(e: ChangeEvent<any>): void;
}

export const SegmentCheckBox = ({
  selectedSegments,
  segment,
  inputName,
  onChange,
}: ISegmentCheckBoxProps) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const excededMaxLenth =  selectedSegments.length == 3;
  const disableButton = excededMaxLenth && selectedSegment !== segment;

  return (
    <li className="text-center py-1 px-1">
      <input
        type="checkbox"
        disabled={disableButton}
        onClick={() => {
          if (selectedSegment === segment) setSelectedSegment("");
          else setSelectedSegment(segment);
        }}
        id={segment}
        placeholder="Segmento"
        onChange={onChange}
        value={segment}
        name={inputName}
        className={`peer/input hidden`}
      />
      <label
        htmlFor={segment}
        className={` ${
          disableButton ? " cursor-default" : "cursor-pointer"
        } text-gray-500 border border-gray-300 bg-white peer-checked/input:text-sky-500 peer-checked/input:border-sky-400  rounded-full px-3 py-1`}
      >
        {segment}
      </label>
    </li>
  );
};
