import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
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
        <div className="h-full flex justify-center items-center">
          <div className="text-sky-500 w-6">
            <LoadingSpinnerAnimation strokeWith={2} />
          </div>
        </div>
      ) : (
        <p className="font-bold group-hover:text-sky-500">{data.length}</p>
      )}
    </DataCardButton>
  );
}
