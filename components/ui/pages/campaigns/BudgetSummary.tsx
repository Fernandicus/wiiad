import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

export const BudgetSummary = (/* params: { pricePC: number } */) => {
  const {state} = usePaymentProcess()
 // const { pricePC } = params;
  /* const ppc = new PricesPerClick();
  const amount = ppc.getAmounts()[pricePC];
  const clicks = ppc.getClicksPerPrice()[pricePC];
  const pricePerClick = ppc.getPricePerClick()[pricePC]; */
  return (
    <div className="space-y-2">
      <p className=" font-bold text-gray-500">Campaña</p>
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Presupuesto:</p>
          <p>Visualizaciones:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
          <p>{state.budget.amount / 100}€</p>
          <p>{state.budget.clicks}</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Coste por visualización:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
          <p>{state.budget.pricePerClick/ 100}0€</p>
        </div>
      </div>
    </div>
  );
};
