export const MaxLengthCounterLabel = (params: {
  title: string;
  maxLength: number;
  length: number;
}) => {
  const { length, maxLength, title } = params;
  return (
    <label className="font-bold">
      {title}{" "}
      <span
        className={`font-medium text-sm ${
          length > maxLength ? "text-red-500" : "text-gray-500"
        }`}
      >
        ({length}/{maxLength})
      </span>
    </label>
  );
};
