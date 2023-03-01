import { ReactElement } from "react";
import { BackIcon } from "../icons/BackIcon";
import { ChevronRight } from "../icons/ChevronRight";
import { SectionHeader } from "../pages/items/SectionHeader";

interface SectionNavProps {
  titleLable: string;
  descriptionLabel: string;
  onClick(): void;
  children?: ReactElement;
}

export const NavDialogButton = ({
  descriptionLabel,
  onClick,
  titleLable,
  children,
}: SectionNavProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" w-full py-3 px-5 hover:bg-slate-50"
    >
      <div className=" flex justify-between items-center ">
        <div className="flex items-center text-start space-x-5">
          {children && <div className="text-gray-600">{children}</div>}

          <div>
            <h1 className="font-medium">{titleLable}</h1>
            <p className="text-gray-600 text-sm">{descriptionLabel}</p>
          </div>
        </div>

        <div className="w-5 text-gray-600">
          <ChevronRight />
        </div>
      </div>
    </button>
  );
};
