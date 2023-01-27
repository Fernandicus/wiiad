import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import { IPaymentProcessCtxState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessContext";
import { IPaymentProcessState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessState";
import {
  removeBudgetDetails,
  storeBudgetDetails,
  storePaymentMethod,
} from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IBudgetDetails {
  amount: number;
  clicks: number;
  pricePerClick: number;
}

interface IUsePaymentProcess {
  state: IPaymentProcessState;
  payWithExistingCard(adId: string): Promise<void>;
  payWithNewCard(adId: string): Promise<string>;
  index: number;
  storePaymentMethod(pm: string): void;
  storeBudget(budget: IBudgetDetails): void;
  storeBudgetFromAvailables(index: number): void;
  removeBudget(): void;
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

  const payWithExistingCard = async (adId: string): Promise<void> => {
    if (index < 0 || index > prices.amounts.length - 1)
      throw new Error(
        `Selected amount is not available ${state.budget.amount}`
      );

    try {
      await stripePayment.payWithSelectedCard({
        budgetItem: index,
        adId: adId,
        paymentMethod: state.paymentMethod,
      });

      dispatch(removeBudgetDetails());
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const payWithNewCard = async (adId: string): Promise<string> => {
    if (index < 0 || index > prices.amounts.length - 1)
      throw new Error(
        `Selected amount is not available ${state.budget.amount}`
      );

    try {
      const clientSecret = await stripePayment.payUsingNewCard({
        budgetItem: index,
        adId,
      });
      dispatch(removeBudgetDetails());
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
    removeBudget: () => {
      dispatch(removeBudgetDetails());
    },
    payWithExistingCard,
    payWithNewCard,
  };
};
