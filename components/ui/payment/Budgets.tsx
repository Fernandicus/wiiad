import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { useState } from "react";
import { BudgetButton } from "./items/BudgetButton";
import { BudgetView } from "./items/BudgetView";

interface IBudgetParams {
  pricePC:number;
  onSelectBudget(index: number): void;
}

export const Budgets = ({ onSelectBudget, pricePC }: IBudgetParams) => {
  const [selectedBudget, setBudget] = useState<number>(pricePC);
  const isSelected = (budget: number) => selectedBudget === budget && true;
  const ppc = new PricesPerClick();
  const amounts = ppc.getAmounts();
  const clicks = ppc.getClicksPerPrice();

  return (
    <div>
      <h1 className="font-bold text-md text-gray-500">Visualizaciones:</h1>
      <BudgetView clicks={clicks[selectedBudget]}/>
      <div className="space-y-2">
        <h2 className="font-bold text-md text-gray-500">Precio:</h2>
        <div className="space-x-1 flex ">
          {amounts.map((prices, index) => {
            return (
              <BudgetButton
                isSelected={isSelected(index)}
                onSelect={() => {
                  setBudget(index);
                  onSelectBudget(index);
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
