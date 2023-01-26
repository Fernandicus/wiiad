export const BudgetSummary = (params:{budget:{budget:number, clicks:number}}) => {
  const {budget}=params;
  return (
    <div className="space-y-2">
      <p className=" font-bold text-gray-500">Campaña</p>
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Presupuesto:</p>
          <p>Visualizaciones:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
          <p>{budget.budget}</p>
          <p>{budget.clicks}</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2">
        <div className="text-start text-gray-500 text-sm">
          <p>Coste por visualización:</p>
        </div>

        <div className="text-end text-gray-500 text-sm">
        <p>{budget.budget / budget.clicks}</p>
        </div>
      </div>
    </div>
  );
};
