interface IRemoveProps {
  onRemove(): void;
  children: JSX.Element | JSX.Element[] | string;
}

export const RemoveButton = ({ onRemove, children }: IRemoveProps) => {
  return (
    <button
      className="text-sm bg-red-100 hover:bg-red-500 text-red-500 hover:text-white py-1 px-2 rounded-md font-medium w-full"
      type="button"
      onClick={onRemove}
    >
      {children}
    </button>
  );
};
