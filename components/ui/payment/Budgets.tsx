import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { useEffect } from "react";
import { BudgetButton } from "./items/BudgetButton";
import { BudgetView } from "./items/BudgetView";

export const Budgets = () => {
  const { storeBudgetFromAvailables, availableBudgets, state } =
    usePaymentProcess();
  const isSelected = (amount: number) => state.budget.amount === amount && true;

  useEffect(() => {
    storeBudgetFromAvailables(0);
  }, []);

  const amounts = availableBudgets.getAmounts();

  return (
    <div>
      <h1 className="font-bold text-md text-gray-500">Visualizaciones:</h1>
      <BudgetView clicks={state.budget.clicks} />
      <div className="space-y-2">
        <h2 className="font-bold text-md text-gray-500">Precio:</h2>
        <div className="space-x-1 flex ">
          {amounts.map((amount, index) => {
            return (
              <BudgetButton
                isSelected={isSelected(amount)}
                onSelect={() => {
                  storeBudgetFromAvailables(index);
                }}
                price={amounts[index] / 100}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
