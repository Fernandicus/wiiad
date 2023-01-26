import { StripePaymentProcess } from "../../src/payments/StripePaymentProcess";
import { MouseEvent, useReducer, useState } from "react";
import { CreditCards } from "./CreditCards";
import { Budgets } from "./Budgets";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { useRouter } from "next/router";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { stat } from "fs";
import { useSetBudgetAndPM } from "./hooks/useSetBudgetAndPM";

interface IBudgetAndPMethods {
  setBudget(params: { budget: number; clicks: number }): void;
  paymentMethods?: ICardDetailsPrimitives[];
  onContinue(clientSecret: string): void;
  onSelectedPaymentMethod(selectedMethod?: string): void;
  ad?: AdPropsPrimitives;
}

export const BudgetAndPaymentMethod = (props: IBudgetAndPMethods) => {
  const { setBudget, paymentMethods, onContinue, onSelectedPaymentMethod, ad } =
    props;
  const { state, dispatch } = useSetBudgetAndPM();

  const handlePaymentAmount = async (useNewCard = false) => {
    dispatch.setIsPaying();

    if (state.isPaying) return;
    if (!ad) return;
    if (state.budget < 0) return;

    try {
      const stripePayment = new StripePaymentProcess();
      if (useNewCard) {
        const clientSecret = await stripePayment.payUsingNewCard({
          budgetItem: state.budget,
          adId: ad.id,
        });
        dispatch.removeIsPaying();
        onContinue(clientSecret);
        return;
      } else {
        await stripePayment.payWithSelectedCard({
          budgetItem: state.budget,
          adId: ad.id,
          paymentMethod: state.paymentMethod,
        });
        dispatch.removeIsPaying();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {state.isCardPage ? (
          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold">Elije el método de pago</h3>
            <CreditCards
              paymentMethods={paymentMethods}
              onSelectedMethod={(method) => {
                if (!method) return;
                dispatch.setPaymentMethod(method);
                onSelectedPaymentMethod(method);
              }}
            />
          </div>
        ) : (
          <Budgets
            onSelectBudget={(budget) => {
              dispatch.setBudget(budget.amount);
              setBudget({budget: state.budget, clicks:state.budget})
            }}
          />
        )}
      </div>
      <div className="space-y-2">
        <button
          className={`rounded-md w-full py-2 transition duration-150 ${
            !state.isCardPage
              ? " bg-sky-500 hover:bg-sky-400 text-white "
              : state.isCardPage && state.paymentMethod
              ? " bg-sky-500 hover:bg-sky-400 text-white "
              : "bg-slate-300 text-gray-500 cursor-default"
          }`}
          onClick={async (e) => {
            e.preventDefault();
            console.log(state.isCardPage);
            console.log(paymentMethods);
            if (
              !state.isCardPage &&
              (!paymentMethods || paymentMethods.length == 0)
            ) {
              dispatch.setPayWithPM();
              await handlePaymentAmount(true);
              dispatch.setPayWithPM();
            } else if (!state.isCardPage && paymentMethods) {
              dispatch.setIsCardPage();
            } else if (state.isCardPage && state.paymentMethod) {
              dispatch.setPayWithPM();
              await handlePaymentAmount();
              dispatch.setPayWithPM();
            }
          }}
        >
          {state.isCardPage ? (
            state.isPayingWithPM ? (
              <div className="w-full flex justify-center">
                <div className="w-6 h-6 ">
                  <LoadingSpinnerAnimation />
                </div>
              </div>
            ) : (
              "Pagar y lanzar"
            )
          ) : state.isPayingWithPM ? (
            <div className="w-full flex justify-center">
              <div className="w-6 h-6 ">
                <LoadingSpinnerAnimation />
              </div>
            </div>
          ) : (
            "Continuar"
          )}
        </button>
        {state.isCardPage && (
          <button
            className="bg-sky-50 hover:bg-sky-100 text-sky-500 rounded-md w-full py-2 transition duration-150"
            onClick={async (e) => {
              e.preventDefault();
              onSelectedPaymentMethod(undefined);
              if (state.isCardPage) {
                dispatch.setPayWithNewCard();
                await handlePaymentAmount(true);
                dispatch.removePayWithNewCard();
              }
            }}
          >
            {state.isPayingWithNewCard ? (
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
