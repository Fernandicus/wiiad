import { useState } from "react";

interface IBudgetParams {
  onSelectBudget(amount: number): void;
}

export const Budgets = ({ onSelectBudget }: IBudgetParams) => {
  const [budget, setBudget] = useState<number>(0);
  const [amount, setAmount] = useState<number>(50);
  const [clicks, setClicks] = useState<number>(1000);

  const defaultStyle = "border rounded-lg w-full text-sm py-1";
  const selectedStyle = "bg-sky-50 text-sky-500 border-sky-500 font-bold";
  const unSelectedStyle = "bg-white text-slate-700 border-slate-100";

  const getSelected = (num: number): string => {
    const style =
      budget === num ? selectedStyle + defaultStyle : unSelectedStyle;
    const styles = [style, defaultStyle];
    return styles.join(" ");
  };

  return (
    <div>
      <h1 className="font-bold text-lg text-gray-700">
        Calcula tu presupuesto
      </h1>
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
            className={getSelected(0)}
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
            className={getSelected(1)}
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
            className={getSelected(2)}
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
            className={getSelected(3)}
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
            className={getSelected(4)}
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
