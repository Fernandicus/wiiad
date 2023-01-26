import { amountsAndPPClick } from "@/src/common/domain/AmountsAndPricePerClick";
import {
  // AvailableAmounts,
  PaymentAmount,
} from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { getValuesForNumericEnum } from "@/src/utils/helpers";
import { useEffect, useState } from "react";
import { ViewsButton } from "./items/ViewsButton";

interface IBudgetParams {
  onSelectBudget(budget: { amount: number; clicks: number }): void;
}

export const Budgets = ({ onSelectBudget }: IBudgetParams) => {
  const [selectedBudget, setBudget] = useState<number>(0);
  const isSelected = (val: number) => amount === val && true;
  const amount = amountsAndPPClick[selectedBudget][0] / 100;
  const clicks = amountsAndPPClick[selectedBudget][1];

  const getViews = (budgetNum: number) => {
    const amount = amountsAndPPClick[budgetNum][0] / 100;
    const privePerClick = amountsAndPPClick[budgetNum][1];
    const clicks = amount / privePerClick;
    return Math.round(clicks);
  };

  return (
    <div>
      <h1 className="font-bold text-lg text-gray-700">
        Calcula tu presupuesto
      </h1>
      <div className="h-48 w-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-4xl text-gray-600 font-semibold">{amount}€</h2>
          <p className=" text-gray-600 italic">{clicks}€ por visualizacion</p>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm">Visualizaciones:</h2>
        <div className="space-x-1 flex ">
          <ViewsButton
            isSelected={isSelected(50)}
            onSelect={() => {
              setBudget(0);
              onSelectBudget({ amount, clicks });
            }}
            views={getViews(0) / 1000}
          />
          <ViewsButton
            isSelected={isSelected(70)}
            onSelect={() => {
              setBudget(1);
              onSelectBudget({ amount, clicks });
            }}
            views={getViews(1) / 1000}
          />
          <ViewsButton
            isSelected={isSelected(100)}
            onSelect={() => {
              setBudget(2);
              onSelectBudget({ amount, clicks });
            }}
            views={getViews(2) / 1000}
          />
          <ViewsButton
            isSelected={isSelected(150)}
            onSelect={() => {
              setBudget(3);
              onSelectBudget({ amount, clicks });
            }}
            views={getViews(3) / 1000}
          />
          <ViewsButton
            isSelected={isSelected(200)}
            onSelect={() => {
              setBudget(4);
              onSelectBudget({ amount, clicks });
            }}
            views={getViews(4) / 1000}
          />
        </div>
      </div>
    </div>
  );
};
