import { useState } from "react";

interface IBudgetParams {
  onSelectBudget(amount: number): void;
}

export const Budgets = ({ onSelectBudget }: IBudgetParams) => {
  const [budget, setBudget] = useState<number>();

  return (
    <div className="flex justify-center space-x-5">
      <button
        className={`${
          budget === 0
            ? "bg-sky-500 text-white border-sky-500"
            : "bg-white text-sky-500 border-sky-500"
        }text-sky-500 border border-sky-500 rounded-md px-3 py-1`}
        onClick={() => {
          setBudget(0);
          onSelectBudget(0);
        }}
      >
        50 €
      </button>
      <button
        className={`${
          budget === 1
            ? "bg-sky-500 text-white border-sky-500"
            : "bg-white text-sky-500 border-sky-500"
        }text-sky-500 border border-sky-500 rounded-md px-3 py-1`}
        onClick={() => {
          setBudget(1);
          onSelectBudget(1);
        }}
      >
        70 €
      </button>
      <button
        className={`${
          budget === 2
            ? "bg-sky-500 text-white border-sky-500"
            : "bg-white text-sky-500 border-sky-500"
        }text-sky-500 border border-sky-500 rounded-md px-3 py-1`}
        onClick={() => {
          setBudget(2);
          onSelectBudget(2);
        }}
      >
        100 €
      </button>
    </div>
  );
};
