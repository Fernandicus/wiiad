interface ITitleWithDescriptionParams {
  title: string;
  description: string;
}

export const TitleWithDescriptionLabel = (
  params: ITitleWithDescriptionParams
) => {
  const { title, description } = params;
  return (
    <label className="font-bold">
      {title}
      <div className="text-sm text-gray-500 font-medium">{description}</div>
    </label>
  );
};
