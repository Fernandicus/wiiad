import { IButtonProps } from "./interfaces/IButtonProps";

export const TertiaryButton = (props: IButtonProps) => {
  return (
    <button className=" text-sky-500" type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
