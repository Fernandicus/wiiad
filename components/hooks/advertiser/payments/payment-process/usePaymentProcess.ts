import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import { IPaymentProcessCtxState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessContext";
import { IPaymentProcessState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessState";
import {
  removeDetails,
  storeAdToLaunch,
  storeBudgetDetails,
  storePaymentMethod,
} from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IBudgetDetails {
  amount: number;
  clicks: number;
  pricePerClick: number;
}

interface IUsePaymentProcess {
  state: IPaymentProcessState;
  storeAdToLaunch(ad: AdPropsPrimitives): void;
  /* payWithExistingCard(): Promise<void>;
  payWithNewCard(): Promise<string>; */
  index: number;
  storePaymentMethod(pm: string): void;
  storeBudget(budget: IBudgetDetails): void;
  storeBudgetFromAvailables(index: number): void;
  removeDetails(): void;
  availableBudgets: PricesPerClick;
}

export const usePaymentProcess = (): IUsePaymentProcess => {
  const state = useSelector(
    (state: IPaymentProcessCtxState) => state.paymentProcess
  );
  const dispatch = useDispatch();
  const stripePayment = new StripePaymentProcess();
  const prices = new PricesPerClick();
  const index = prices.getIndexFromPrice(state.budget.amount);

  const payWithExistingCard = async (): Promise<void> => {
    if (index < 0 || index > prices.amounts.length - 1)
      throw new Error(
        `Selected amount is not available ${state.budget.amount}`
      );

    try {
      await stripePayment.payWithSelectedCard({
        budgetItem: index,
        adId: state.ad.id,
        paymentMethod: state.paymentMethod,
      });

      dispatch(removeDetails());
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const payWithNewCard = async (): Promise<string> => {
    if (index < 0 || index > prices.amounts.length - 1)
      throw new Error(
        `Selected amount is not available ${state.budget.amount}`
      );

    try {
      const clientSecret = await stripePayment.payUsingNewCard({
        budgetItem: index,
        adId: state.ad.id,
      });
      dispatch(removeDetails());
      return clientSecret;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("Something went wrong while paying with new card");
    }
  };

  return {
    state,
    index,
    availableBudgets: prices,
    storeAdToLaunch: (ad: AdPropsPrimitives) => dispatch(storeAdToLaunch({ ad })),
    storePaymentMethod: (pm: string) => {
      dispatch(storePaymentMethod({ paymentMethod: pm }));
    },
    storeBudgetFromAvailables: (index: number) => {
      const budget: IBudgetDetails = {
        amount: prices.getAmounts()[index],
        clicks: prices.getClicksPerPrice()[index],
        pricePerClick: prices.getPricePerClick()[index],
      };
      dispatch(storeBudgetDetails({ budget }));
    },
    storeBudget: (budget: IBudgetDetails) => {
      dispatch(storeBudgetDetails({ budget }));
    },
    removeDetails: () => {
      dispatch(removeDetails());
    },
    /* payWithExistingCard,
    payWithNewCard, */
  };
};
