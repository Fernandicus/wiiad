interface ISectionHeaderProps {
  titleLable: string;
  descriptionLabel: string;
  children?: JSX.Element | JSX.Element[];
}

export const SectionHeader = ({
  titleLable,
  descriptionLabel,
  children,
}: ISectionHeaderProps) => {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h1 className="font-bold text-lg">{titleLable}</h1>
        <p className="text-gray-600">{descriptionLabel}</p>
      </div>
      {children}
    </div>
  );
};
