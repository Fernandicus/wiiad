interface IRemoveProps {
  onRemove(): void;
  children: JSX.Element | JSX.Element[] | string;
}

export const RemoveButton = ({ onRemove, children }: IRemoveProps) => {
  return (
    <button
      className=" bg-red-100 hover:bg-red-500 text-red-500 hover:text-white transition ease-in duration-100 btn"
      type="button"
      onClick={onRemove}
    >
      {children}
    </button>
  );
};
