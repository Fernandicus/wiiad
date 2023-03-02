import { DataCardButton } from "./DataCardButton";

interface ILoadDataCardButton<T> {
  redirection: string;
  title: string;
  isLoading: boolean;
  data: T[];
}

export function LoadDataCardButton<T>(params: ILoadDataCardButton<T>) {
  const { data, redirection, title, isLoading } = params;
  return (
    <DataCardButton href={`${redirection}`} title={title}>
      {isLoading ? (
        <p className="font-bold text-black">...</p>
      ) : (
        <p className="font-bold group-hover:text-sky-500">{data.length}</p>
      )}
    </DataCardButton>
  );
}
