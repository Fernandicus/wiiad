import { CreditCardItemShape } from "@/components/ui/payment/items/CreditCardItemShape";

export const CreditCardLoader = () => {
  return (
    <div className="rounded-lg animate-pulse bg-slate-200/80 overflow-hidden">
      <CreditCardItemShape>
        <div className="w-full h-full">
          <div className="animate-creditCardShine h-full">
            <div className="w-1/12 h-72 rotate-12 bg-white blur-lg"></div>
          </div>
        </div>
      </CreditCardItemShape>
    </div>
  );
};
