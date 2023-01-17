import { IButtonProps } from "./interfaces/IButtonProps";

export const PrimaryButton = (props: IButtonProps) => {
  return (
    <button
      className="bg-sky-500 text-white p-1 w-full h-10 rounded-md hover:bg-sky-400 transition ease-in duration-150"
      type={props.type}
      onClick={props.onClick}
      onSubmit={props.onSumbit}
    >
      {props.label}
    </button>
  );
};
