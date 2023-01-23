import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { AdCardItem } from "./AdCardItem";

interface Props {
  ad: AdPropsPrimitives;
  campaign: ICampaignPrimitives | null;
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  onDeleteAd(id: string): void;
}

export const AdCard = ({
  ad,
  campaign,
  onLaunchCampaign,
  onDeleteAd,
}: Props) => {
  return (
    <AdCardItem image={ad.file}>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-600">{ad.title}</h3>
        <p className="text-gray-500">{`${ad.description.slice(0, 70)}...`}</p>
        <a className="text-sky-500 italic" href={`${ad.redirectionUrl}`}>
          {ad.redirectionUrl}
        </a>
      </div>
      <div className="space-x-5 flex justify-center pt-3">
        {!campaign ? (
          <button
            className="text-sm bg-red-100 hover:bg-red-500 text-red-500 hover:text-white py-1 px-2 rounded-md font-medium w-full"
            type="button"
            onClick={() => onDeleteAd(ad.id)}
          >
            Eliminar anuncio
          </button>
        ) : null}
        <button
          className={`text-sm ${
            campaign
              ? "bg-slate-200 text-slate-400"
              : "bg-sky-500 hover:bg-sky-400 text-white"
          }   p-2 rounded-md font-medium w-full`}
          type="button"
          onClick={campaign ? undefined : () => onLaunchCampaign(ad)}
        >
          {!campaign ? (
            <span>Lanzar campaña</span>
          ) : (
            <span>Campaña lanzada</span>
          )}
        </button>
      </div>
    </AdCardItem>
  );
};
