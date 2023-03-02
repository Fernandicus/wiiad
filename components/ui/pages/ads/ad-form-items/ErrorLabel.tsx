export const ErrorLabel = (params: { errorText: string }) => {
  return <span className="text-xs text-red-500">{params.errorText}</span>;
};
