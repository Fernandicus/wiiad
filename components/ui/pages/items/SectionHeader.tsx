import { BackIcon } from "../../icons/BackIcon";

interface ISectionHeaderProps {
  titleLable: string;
  descriptionLabel: string;
  children?: JSX.Element | JSX.Element[];
  onBack?(): void;
}

export const SectionHeader = ({
  titleLable,
  descriptionLabel,
  children,
  onBack,
}: ISectionHeaderProps) => {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div className="flex space-x-5 items-start ">
        {onBack && (
          <button
            onClick={onBack}
            className="mt-1 w-6 h-auto hover:text-sky-500"
          >
            <BackIcon />
          </button>
        )}
        <div>
          <h1 className="font-bold text-lg">{titleLable}</h1>
          <p className="text-gray-600">{descriptionLabel}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
