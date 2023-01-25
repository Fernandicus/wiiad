import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { NotificationData } from "../../notifications/Notifications";
import { RemoveAdButton } from "./ad-card-items/RemoveAdButton";
import { AdCardItem } from "./AdCardItem";

interface Props {
  ad: AdPropsPrimitives;
  campaign: ICampaignPrimitives | null;
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
}

export const AdCard = (props: Props) => {
  const { ad, campaign, onLaunchCampaign, handleResponse } = props;
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
        {!campaign && <RemoveAdButton handleResponse={handleResponse} adId={ad.id} />}
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
