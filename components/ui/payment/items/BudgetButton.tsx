interface IBudgetButtonParams {
  price: number;
  isSelected: boolean;
  onSelect(views: number): void;
}

export const BudgetButton = (params: IBudgetButtonParams) => {
  const { price, isSelected, onSelect } = params;
  return (
    <button
      className={`${
        isSelected
          ? "bg-sky-50 text-sky-500 border-sky-500 font-bold"
          : "bg-white text-slate-700 border-slate-100"
      } border rounded-lg w-full text-sm py-1`}
      onClick={() => {
        onSelect(price);
      }}
    >
    {`${price}€`}
    </button>
  );
};
