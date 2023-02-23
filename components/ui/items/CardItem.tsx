import { ReactElement } from "react";

interface ICardItemProps {
  children: ReactElement;
  fullWidth?:boolean;
}

export const CardItem = ({ children, fullWidth = true }: ICardItemProps) => {
  return (
    <div className={`${!fullWidth && 'inline-block' } bg-white shadow-lg shadow-slate-200 p-4 rounded-lg text-gray-600`}>
      {children}
    </div>
  );
};
