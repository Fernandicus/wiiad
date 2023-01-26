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

interface IBudgetAndPMethods {
  paymentMethods?: ICardDetailsPrimitives[];
  onContinue(clientSecret: string): void;
  onSelectedPaymentMethod(selectedMethod?: string): void;
  ad?: AdPropsPrimitives;
}

type TBudgetAction =
  | "set-budget"
  | "set-pm"
  | "set-payWithPM"
  | "set-payWithNewCard"
  | "remove-payWithNewCard"
  | "set-isCardPage"
  | "set-isPaying"
  | "remove-isPaying";

interface IBudgetAction {
  type: TBudgetAction;
  payload?: IBudgetState;
}

interface IBudgetState {
  budget: number;
  clicks: number;
  paymentMethod: string;
  isCardPage: boolean;
  isPaying: boolean;
  isPayingWithPM: boolean;
  isPayingWithNewCard: boolean;
}

export const BudgetAndPaymentMethod = ({
  paymentMethods,
  onContinue,
  onSelectedPaymentMethod,
  ad,
}: IBudgetAndPMethods) => {

  const initBudgetState: IBudgetState = {
    budget: 50,
    clicks: 1000,
    paymentMethod: "",
    isCardPage: false,
    isPaying: false,
    isPayingWithPM: false,
    isPayingWithNewCard: false,
  };

  const budgetReducer = (
    state: typeof initBudgetState,
    action: IBudgetAction
  ): IBudgetState => {
    const payload = action.payload;
    switch (action.type) {
      case "set-budget":
        if (!payload) return { ...state };
        return {
          ...state,
          budget: payload.budget,
          clicks: payload.budget / 1000,
        };
      case "set-pm":
        if (!payload) return { ...state };
        return {
          ...state,
          paymentMethod: payload.paymentMethod,
        };
      case "set-payWithPM":
        return {
          ...state,
          isPayingWithPM: true,
        };
      case "set-payWithNewCard":
        return {
          ...state,
          isPayingWithNewCard: true,
        };
      case "remove-payWithNewCard":
        return {
          ...state,
          isPayingWithNewCard: false,
        };
      case "set-isCardPage":
        return {
          ...state,
          isCardPage: true,
        };
      case "set-isPaying":
        return {
          ...state,
          isPaying: true,
        };
      case "remove-isPaying":
        return {
          ...state,
          isPaying: false,
        };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(budgetReducer, initBudgetState);

  const handlePaymentAmount = async (useNewCard = false) => {
    dispatch({type:"set-isPaying"})

    console.log(" handlePaymentAmount() ");

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
        dispatch({type:"remove-isPaying"})
        onContinue(clientSecret);
        return;
      } else {
        await stripePayment.payWithSelectedCard({
          budgetItem: state.budget,
          adId: ad.id,
          paymentMethod: state.paymentMethod
        });
        dispatch({type:"remove-isPaying"})
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
                dispatch({
                  type: "set-pm",
                  payload: { ...state, paymentMethod: method },
                });
                onSelectedPaymentMethod(method);
              }}
            />
          </div>
        ) : (
          <Budgets
            onSelectBudget={(budget) =>
              dispatch({ type: "set-budget", payload: { ...state, budget } })
            }
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
              dispatch({ type: "set-payWithPM" });
              await handlePaymentAmount(true);
              dispatch({ type: "set-payWithPM" });
            } else if (!state.isCardPage && paymentMethods) {
              dispatch({ type: "set-isCardPage" });
            } else if (state.isCardPage && state.paymentMethod) {
              dispatch({ type: "set-payWithPM" });
              await handlePaymentAmount();
              dispatch({ type: "set-payWithPM" });
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
                dispatch({ type: "set-payWithNewCard" });
                await handlePaymentAmount(true);
                dispatch({ type: "remove-payWithNewCard" });
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
