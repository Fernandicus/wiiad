interface IViewsButtonParams {
  views: number;
  isSelected: boolean;
  onSelect(views: number): void;
}

export const ViewsButton = (params: IViewsButtonParams) => {
  const { views, isSelected, onSelect } = params;
  return (
    <button
      className={`${
        isSelected
          ? "bg-sky-50 text-sky-500 border-sky-500 font-bold"
          : "bg-white text-slate-700 border-slate-100"
      } border rounded-lg w-full text-sm py-1`}
      onClick={() => {
        onSelect(views);
      }}
    >
      <p>{views} mil</p>
    </button>
  );
};
