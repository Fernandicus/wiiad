import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export const AdSummary = ({ ad }: { ad: AdPropsPrimitives }) => {
  return (
    <div className="space-y-1">
      <img
        className=" w-full h-32 object-cover rounded-xl"
        src={ad!.file}
      ></img>
      <p className=" font-bold truncate">{ad!.title}</p>
      <p className="text-gray-600 text-sm truncate">{ad!.description}</p>
      <p className="text-sky-500 text-sm truncate">{ad!.redirectionUrl}</p>
    </div>
  );
};