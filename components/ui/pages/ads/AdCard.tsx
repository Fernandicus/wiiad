import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { PrimaryButton } from "../../buttons/PrimaryButton";
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
        <RemoveAdButton handleResponse={handleResponse} adId={ad.id} />
        {!campaign && (
          <PrimaryButton
            type="button"
            onClick={() => {
              onLaunchCampaign(ad);
            }}
          >
            Lanzar campaña
          </PrimaryButton>
        )}
      </div>
    </AdCardItem>
  );
};
