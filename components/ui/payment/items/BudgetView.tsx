export const BudgetView = ({ clicks }: { clicks: number }) => {
  return (
    <div className="h-48 w-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl  font-semibold">{clicks}</h2>
        <p className="text-sm text-gray-500 italic">
          visualizaciones completas
        </p>
      </div>
    </div>
  );
};
