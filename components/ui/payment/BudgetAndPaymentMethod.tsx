import { StripePaymentProcess } from "../../src/payments/StripePaymentProcess";
import { MouseEvent, useState } from "react";
import { CreditCards } from "./CreditCards";
import { Budgets } from "./Budgets";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

interface IBudgetAndPMethods {
  paymentMethods?: string[];
  onContinue(clientSecret: string): void;
  onSelectedPaymentMethod(selectedMethod?: string): void;
  ad?: AdPropsPrimitives;
}

export const BudgetAndPaymentMethod = ({
  paymentMethods,
  onContinue,
  onSelectedPaymentMethod,
  ad,
}: IBudgetAndPMethods) => {
  ///const [clientSecret, setClientSecret] = useState<string>();
  const [budget, setBudget] = useState<number>();
  const [method, setPaymentMethod] = useState<string>();

  const handlePaymentAmount = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ad) return;
    if (!budget || budget < 0 || budget > 2) return;
    try {
      const stripePayment = new StripePaymentProcess();
      const clientSecret = await stripePayment.setPaymentAmount(budget, ad.id ,method);
      console.log(clientSecret);
      if (method) return;
      onContinue(clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {paymentMethods && (
          <div className="text-center space-y-2 ">
            <h3 className="text-center text-lg font-semibold">Tus tarjetas</h3>
            <CreditCards
              paymentMethods={paymentMethods}
              onSelectedMethod={(method) => {
                setPaymentMethod(method);
                onSelectedPaymentMethod(method);
              }}
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-center text-lg font-semibold">
            Elige un presupuesto
          </h1>
          <Budgets onSelectBudget={setBudget} />
        </div>
      </div>
      <button
        className={`${
          budget
            ? "bg-sky-500 text-white border-sky-500"
            : "text-sky-500 border-sky-500 bg-white "
        } border b rounded-md w-full py-2`}
        onClick={handlePaymentAmount}
      >
        Lanzar campaña
      </button>
    </div>
  );
};
