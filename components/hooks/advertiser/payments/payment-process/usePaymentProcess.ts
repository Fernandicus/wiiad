import { IPaymentProcessCtxState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessContext";
import { IPaymentProcessState } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessState";
import {
  removeBudgetDetails,
  storeBudgetDetails,
  storePaymentMethod,
} from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";
import { useDispatch, useSelector } from "react-redux";

interface IBudgetDetails {
  amount: number;
  clicks: number;
  pricePerClick: number;
}

interface IUsePaymentProcess {
  state: IPaymentProcessState;
  storePaymentMethod(pm: string): void;
  storeBudget(budget: IBudgetDetails): void;
  removeBudget(): void;
}

export const usePaymentProcess = (): IUsePaymentProcess => {
  const state = useSelector(
    (state: IPaymentProcessCtxState) => state.paymentProcess
  );
  const dispatch = useDispatch();

  return {
    state,
    storePaymentMethod: (pm: string) => {
      dispatch(storePaymentMethod({ paymentMethod: pm }));
    },
    storeBudget: (budget: IBudgetDetails) => {
      dispatch(storeBudgetDetails({ budget }));
    },
    removeBudget: () => {
      dispatch(removeBudgetDetails());
    },
  };
};
