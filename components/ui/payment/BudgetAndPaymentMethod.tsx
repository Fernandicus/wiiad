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
  const [budget, setBudget] = useState<number>(0);
  const [method, setPaymentMethod] = useState<string>();
  const [isSelectCardPage, setSelectCardPage] = useState<boolean>(false);

  const handlePaymentAmount = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ad) return;
    if (!budget || budget < 0) return;

    console.log(" budget ", budget);
    try {
      const stripePayment = new StripePaymentProcess();
      const clientSecret = await stripePayment.setPaymentAmount(
        budget,
        ad.id,
        method
      );
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
        {isSelectCardPage ? (
          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold">Tus tarjetas</h3>
            <CreditCards
              paymentMethods={paymentMethods!}
              onSelectedMethod={(method) => {
                setPaymentMethod(method);
                onSelectedPaymentMethod(method);
              }}
            />
          </div>
        ) : (
          <Budgets onSelectBudget={setBudget} />
        )}
      </div>
      <button
        className={`${
          budget || budget == 0
            ? "bg-sky-500 text-white border-sky-500"
            : "text-sky-500 border-sky-500 bg-white "
        } border b rounded-md w-full py-2`}
        onClick={(e) => {
          isSelectCardPage ? handlePaymentAmount(e) : setSelectCardPage(true);
        }}
      >
        {isSelectCardPage ? "Pagar y lanzar" : "Continuar"}
      </button>
    </div>
  );
};
