interface ICardItemProps {
  children: JSX.Element | JSX.Element[];
}

export const CardItem = ({ children }: ICardItemProps) => {
  return (
    <div className="bg-white shadow-lg shadow-slate-200 p-4 rounded-lg text-gray-600">
      {children}
    </div>
  );
};
