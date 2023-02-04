import { CreditCardIcon } from "../icons/CreditCardIcon";

export const CreditCardAdd = () => {
  return (
    <div className="hover:bg-white/30 group hover:border-sky-400 transition ease-out duration-150 w-64 h-36 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-gray-500 group-hover:text-sky-500 transition ease-out duration-150">
        <div className="flex justify-center ">
          <div className="w-6 h-6 stroke-1">
            <CreditCardIcon />
          </div>
        </div>
        <p>Añade una tarjeta</p>
      </div>
    </div>
  );
};
