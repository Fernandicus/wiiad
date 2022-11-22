import { StripePaymentProcess } from "../../src/payments/StripePaymentProcess";
import { MouseEvent, useState } from "react";
import { CreditCards } from "./CreditCards";
import { Budgets } from "./Budgets";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { useRouter } from "next/router";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";

interface IBudgetAndPMethods {
  paymentMethods?: ICardDetailsPrimitives[];
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
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isPayingWithPM, setPayingWithPM] = useState<boolean>(false);
  const [isPayingWithNewCard, setPayingWithNewCard] = useState<boolean>(false);
  const router = useRouter();

  const handlePaymentAmount = async (useNewCard = false) => {
    setIsPaying(true);

    console.log(" handlePaymentAmount() ");

    if (isPaying) return;
    if (!ad) return;
    if (budget < 0) return;

    try {
      const stripePayment = new StripePaymentProcess();
      if (useNewCard) {
        const clientSecret = await stripePayment.payUsingNewCard({
          budgetItem: budget,
          adId: ad.id,
        });
        setIsPaying(false);
        onContinue(clientSecret);
        return;
      } else {
        await stripePayment.payWithSelectedCard({
          budgetItem: budget,
          adId: ad.id,
          paymentMethod: method!,
        });
        setIsPaying(false);
        const splitedPath = window.location.pathname.split("/");
        const path = `/${splitedPath[1]}/campaigns`;
        router.push(path);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {isSelectCardPage ? (
          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold">Elije el método de pago</h3>
            <CreditCards
              paymentMethods={paymentMethods}
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
      <div className="space-y-2">
        <button
          className={`rounded-md w-full py-2 transition duration-150 ${
            !isSelectCardPage
              ? " bg-sky-500 hover:bg-sky-400 text-white "
              : isSelectCardPage && method
              ? " bg-sky-500 hover:bg-sky-400 text-white "
              : "bg-slate-300 text-gray-500 cursor-default"
          }`}
          onClick={async (e) => {
            e.preventDefault();

            if (!isSelectCardPage && (!paymentMethods || paymentMethods.length == 0)) {
              setPayingWithPM(true);
              await handlePaymentAmount(true);
              setPayingWithPM(false);
            } else if (!isSelectCardPage && paymentMethods) {
              setSelectCardPage(true);
            } else if (isSelectCardPage && method) {
              setPayingWithPM(true);
              await handlePaymentAmount();
              setPayingWithPM(false);
            }
          }}
        >
          {isSelectCardPage ? (
            isPayingWithPM ? (
              <div className="w-full flex justify-center">
                <div className="w-6 h-6 ">
                  <LoadingSpinnerAnimation />
                </div>
              </div>
            ) : (
              "Pagar y lanzar"
            )
          ) : isPayingWithPM ? (
            <div className="w-full flex justify-center">
              <div className="w-6 h-6 ">
                <LoadingSpinnerAnimation />
              </div>
            </div>
          ) : (
            "Continuar"
          )}
        </button>
        {isSelectCardPage && (
          <button
            className="bg-sky-50 hover:bg-sky-100 text-sky-500 rounded-md w-full py-2 transition duration-150"
            onClick={async (e) => {
              e.preventDefault();
              onSelectedPaymentMethod(undefined);
              if (isSelectCardPage) {
                setPayingWithNewCard(true);
                await handlePaymentAmount(true);
                setPayingWithNewCard(false);
              }
            }}
          >
            {isPayingWithNewCard ? (
              <div className="w-full flex justify-center">
                <div className="w-6 h-6 ">
                  <LoadingSpinnerAnimation />
                </div>
              </div>
            ) : (
              "Usar nueva tarjeta"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
