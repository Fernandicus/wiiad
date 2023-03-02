import { assertUnreachable } from "@/src/utils/helpers";
import { useReducer } from "react";

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

interface IUseSetBudgetAndPM {
  state: IBudgetState;
  dispatch: {
    setIsPaying(): void;
    removeIsPaying(): void;
    setPaymentMethod(pm: string): void;
    setBudget(budget: number): void;
    setPayWithPM(): void;
    setIsCardPage(): void;
    setPayWithNewCard(): void;
    removePayWithNewCard(): void;
  };
}

export const useSetBudgetAndPM = (): IUseSetBudgetAndPM => {
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
        return assertUnreachable(action.type);
    }
  };

  const [state, dispatch] = useReducer(budgetReducer, initBudgetState);

  return {
    state,
    dispatch: {
      setIsPaying: () => dispatch({ type: "set-isPaying" }),
      removeIsPaying: () => dispatch({ type: "remove-isPaying" }),
      setPaymentMethod: (pm: string) =>
        dispatch({
          type: "set-pm",
          payload: { ...state, paymentMethod: pm },
        }),
      setBudget: (budget: number) =>
        dispatch({ type: "set-budget", payload: { ...state, budget } }),
      setPayWithPM: () => dispatch({ type: "set-payWithPM" }),
      setIsCardPage: () => dispatch({ type: "set-isCardPage" }),
      setPayWithNewCard: () => dispatch({ type: "set-payWithNewCard" }),
      removePayWithNewCard: () => dispatch({ type: "remove-payWithNewCard" }),
    },
  };
};
