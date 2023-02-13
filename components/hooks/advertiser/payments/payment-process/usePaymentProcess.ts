import {
  IPaymentProcessState,
  IStoreBudgetDetailsState,
} from "@/context/advertisers/payments/payment-process/payment-process-reducer";
import { paymentProcessSliceActions } from "@/context/advertisers/payments/payment-process/payment-process-slices";
import { TPaymentProcessState } from "@/context/store";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useDispatch, useSelector } from "react-redux";

interface IUsePaymentProcess {
  state: IPaymentProcessState;
  storeAdToLaunch(ad: AdPropsPrimitives): void;
  selectedBudgetIndex: number;
  storePaymentMethod(pm: string): void;
  storeBudget(budget: IStoreBudgetDetailsState): void;
  storeBudgetFromAvailables(index: number): void;
  removeDetails(): void;
  availableBudgets: PricesPerClick;
}

export const usePaymentProcess = (): IUsePaymentProcess => {
  const {
    removeDetails,
    storeAdToLaunch,
    storeBudgetDetails,
    storePaymentMethod,
  } = paymentProcessSliceActions;
  const state = useSelector(
    (state: TPaymentProcessState) => state.paymentProcess
  );
  const dispatch = useDispatch();

  const prices = new PricesPerClick();
  const selectedBudgetIndex = prices.getIndexFromPrice(state.budget.amount);

  return {
    state,
    selectedBudgetIndex,
    availableBudgets: prices,
    storeAdToLaunch: (ad: AdPropsPrimitives) => dispatch(storeAdToLaunch(ad)),
    storePaymentMethod: (paymentMethod: string) => {
      dispatch(storePaymentMethod(paymentMethod));
    },
    storeBudgetFromAvailables: (index: number) => {
      const budget: IStoreBudgetDetailsState = {
        amount: prices.getAmounts()[index],
        clicks: prices.getClicksPerPrice()[index],
        pricePerClick: prices.getPricePerClick()[index],
      };
      dispatch(storeBudgetDetails(budget));
    },
    storeBudget: (budget: IStoreBudgetDetailsState) => {
      dispatch(storeBudgetDetails(budget));
    },
    removeDetails: () => {
      dispatch(removeDetails());
    },
  };
};
