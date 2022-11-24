import { ChangeEvent, useState } from "react";

interface ISegmentComponentProps {
  selectedSegments: string[];
  segment: string;
  inputName: string;
  onChange(e: ChangeEvent<any>): void;
}

export const SegmentComponent = ({
  selectedSegments,
  segment,
  inputName,
  onChange,
}: ISegmentComponentProps) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("");

  const excededMaxLenth = (): boolean => {
    return selectedSegments.length == 3;
  };

  const disableButton = ():boolean=>{
    return  excededMaxLenth() && selectedSegment !== segment
  }

  return (
    <li className="text-center bg-gray-100 py-1 px-1">
      <input
        type="checkbox"
        disabled={
            disableButton()
        }
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
        className={` ${disableButton() ? ' cursor-default' : 'cursor-pointer'} text-gray-500 border border-gray-300 bg-gray-200/50 peer-checked/input:text-sky-500 peer-checked/input:bg-sky-100 peer-checked/input:border-sky-400  rounded-full px-3 py-1`}
      >
        {segment}
      </label>
    </li>
  );
};
