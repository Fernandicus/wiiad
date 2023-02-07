import Remove from "@/pages/api/v1/ads/remove";
import { useEffect, useRef, useState } from "react";
import { RemoveButton } from "../buttons/RemoveButton";
import { CreditCard } from "./CreditCard";

type TParams = Parameters<typeof CreditCard>;

export const CreditCardOptionsButton = (params: TParams[0]) => {
  const { brand, expMonth, expYear, last4, owner } = params;
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isSelected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    const closeDialog = (e: MouseEvent) => {
      const mousePath = e.composedPath();
      const containsButtonRef = mousePath.includes(cardRef.current!);
      if (!containsButtonRef) setSelected(false);
    };

    document.addEventListener("click", closeDialog);

    return () => document.addEventListener("click", closeDialog);
  }, []);

  return (
    <div className="relative ">
      <button
        ref={cardRef}
        onClick={() => {
          setSelected((prev) => !prev);
        }}
        className={`${isSelected && "opacity-20 transitio-all duration-300 "}`}
      >
        <CreditCard
          owner={owner}
          brand={brand}
          expMonth={expMonth}
          expYear={expYear}
          last4={last4}
        />
      </button>
      {isSelected && (
        <div className="absolute transitio-all duration-150  text-center inset-0 flex items-center justify-center ">
          <div>
            <button className="bg-red-500 shadow-md shadow-slate-400 text-white rounded-lg btn" type="button" onClick={() => {}}>
              Eliminar tarjeta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
