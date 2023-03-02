interface IWrappedListProps {
  children: JSX.Element | JSX.Element[];
  cols: number;
  componentIndex: number;
}

export const WrappedList = ({
  children,
  cols,
  componentIndex,
}: IWrappedListProps) => {
  const positionAlign = (index: number): string =>
    index == 0
      ? "justify-start"
      : index + 1 == cols
      ? "justify-end"
      : "justify-center";
  return (
    <div className={`${positionAlign(componentIndex)} flex w-full`}>
      {children}
    </div>
  );
};
