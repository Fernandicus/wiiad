import { useState } from "react";

interface IBudgetParams {
  onSelectBudget(amount: number): void;
}

export const Budgets = ({ onSelectBudget }: IBudgetParams) => {
  const [budget, setBudget] = useState<number>(0);
  const [amount, setAmount] = useState<number>(50);
  const [clicks, setClicks] = useState<number>(1000);

  return (
    <div>
      <h1 className="font-bold text-lg text-gray-700">Elige tu presupuesto</h1>
      <div className="h-48 w-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-4xl text-gray-600 font-semibold">{amount}€</h2>
          <p className=" text-gray-600 italic">
            {amount / clicks}€ por visualizacion
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm">Visualizaciones:</h2>
        <div className="space-x-1 flex ">
          <button
            className={`${
              budget === 0
                ? "bg-slate-200 text-gray-700 border-slate-200 font-bold"
                : "bg-white  text-slate-700 border-slate-100"
            } border rounded-lg w-full text-sm py-1`}
            onClick={() => {
              setBudget(0);
              setAmount(50);
              setClicks(1000);
              onSelectBudget(0);
            }}
          >
            <p>1 mil</p>
          </button>
          <button
            className={`${
              budget === 1
                ? "bg-slate-200 text-gray-700 border-slate-200 font-bold"
                : "bg-white  text-slate-700 border-slate-100"
            } border rounded-lg w-full text-sm py-1`}
            onClick={() => {
              setBudget(1);
              setAmount(70);
              setClicks(2000);
              onSelectBudget(1);
            }}
          >
            <p>2 mil</p>
          </button>
          <button
            className={`${
              budget === 2
                ? "bg-slate-200 text-gray-700 border-slate-200 font-bold"
                : "bg-white  text-slate-700 border-slate-100"
            } border rounded-lg w-full text-sm py-1`}
            onClick={() => {
              setBudget(2);
              setAmount(100);
              setClicks(5000);
              onSelectBudget(2);
            }}
          >
            <p>5 mil</p>
          </button>
          <button
            className={`${
              budget === 3
                ? "bg-slate-200 text-gray-700 border-slate-200 font-bold"
                : "bg-white  text-slate-700 border-slate-100"
            } border rounded-lg w-full text-sm py-1`}
            onClick={() => {
              setBudget(3);
              setAmount(150);
              setClicks(7500);
              onSelectBudget(3);
            }}
          >
            <p>7,5 mil</p>
          </button>
          <button
            className={`${
              budget === 4
                ? "bg-slate-200 text-gray-700 border-slate-200 font-bold"
                : "bg-white  text-slate-700 border-slate-100"
            } border rounded-lg w-full text-sm py-1`}
            onClick={() => {
              setBudget(4);
              setAmount(200);
              setClicks(10000);
              onSelectBudget(4);
            }}
          >
            <p>10 mil</p>
          </button>
        </div>
      </div>
    </div>
  );
};
