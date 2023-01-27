import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

export const BudgetSummary = (params: { pricePC: number }) => {
  const { pricePC } = params;
  const ppc = new PricesPerClick();
  const amount = ppc.getAmounts()[pricePC];
  const clicks = ppc.getClicksPerPrice()[pricePC];
  const pricePerClick = ppc.getPricePerClick()[pricePC];
  return (
    <div className="space-y-2">
      <p className=" font-bold text-gray-500">Campaña</p>
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Presupuesto:</p>
          <p>Visualizaciones:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
          <p>{amount / 100}€</p>
          <p>{clicks}</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Coste por visualización:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
          <p>{pricePerClick/ 100}0€</p>
        </div>
      </div>
    </div>
  );
};
