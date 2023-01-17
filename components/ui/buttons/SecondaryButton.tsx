import { IButtonProps } from "./interfaces/IButtonProps";


export const SecondaryButton = (props: IButtonProps) => {
  return (
    <button
      className="p-1 w-full h-10 text-sky-500  bg-slate-100 hover:bg-sky-100 transition ease-in duration-150 rounded-md"
      type={props.type}
      onClick={props.onClick}
      onSubmit={props.onSumbit}
    >
      {props.label}
    </button>
  );
};
