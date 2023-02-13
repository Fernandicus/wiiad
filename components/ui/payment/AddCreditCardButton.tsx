import { MouseEvent } from "react";
import { CreditCardIcon } from "../icons/CreditCardIcon";
import { CreditCardItemShape } from "./items/CreditCardItemShape";

interface Props {
  onClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): Promise<void>;
}

export const AddCreditCardButton = ({ onClick }: Props) => {
  return (
    <button type="button" onClick={onClick}>
      <CreditCardItemShape>
        <div className="hover:bg-white/30 h-full group hover:border-sky-400 transition ease-out duration-150 rounded-lg  border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-center h-full w-full">
            <div className="text-gray-500 group-hover:text-sky-500 transition ease-out duration-150">
              <div className="flex justify-center ">
                <div className="w-6 h-6 stroke-1">
                  <CreditCardIcon />
                </div>
              </div>
              <p>Añade una tarjeta</p>
            </div>
          </div>
        </div>
      </CreditCardItemShape>
    </button>
  );
};
