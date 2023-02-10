import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { IApiReqRemovePaymentMethod } from "@/pages/api/v1/payments/stripe/remove-pm";
import { getApiResponse } from "@/src/utils/helpers";
import { useRef } from "react";
import { useOpenCloseDialog } from "../hooks/useOpenCloseDialog";
import { CreditCard } from "./CreditCard";

type TCreditCardOptionsButton = Parameters<typeof CreditCard>[0] & {
  pmId: string;
};

export const CreditCardOptionsButton = (params: TCreditCardOptionsButton) => {
  const { brand, expMonth, expYear, last4, owner, pmId } = params;
  const cardRef = useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen } = useOpenCloseDialog({ ref: cardRef });
  const { removePM } = useUserStripe();

  return (
    <div className="relative ">
      <button
        ref={cardRef}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`${isOpen && "opacity-20 transitio-all duration-300 "}`}
      >
        <CreditCard
          owner={owner}
          brand={brand}
          expMonth={expMonth}
          expYear={expYear}
          last4={last4}
        />
      </button>
      {isOpen && (
        <div className="absolute transitio-all duration-150  text-center inset-0 flex items-center justify-center ">
          <div>
            <button
              className="bg-red-500 shadow-md shadow-slate-400 text-white rounded-lg btn"
              type="button"
              onClick={async () => {
                //TODO: REFACT LOGIC
                const body: IApiReqRemovePaymentMethod = {
                  pmId,
                };
                const resp = await fetch("/api/v1/payments/stripe/remove-pm", {
                  method: "DELETE",
                  body: JSON.stringify(body),
                });
                const apiResp = await getApiResponse(resp);
                removePM(pmId);
              }}
            >
              Eliminar tarjeta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
