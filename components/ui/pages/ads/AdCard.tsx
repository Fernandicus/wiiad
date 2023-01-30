import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { NotificationData } from "../../notifications/Notifications";
import { RemoveAdButton } from "./ad-card-items/RemoveAdButton";
import { AdCardItem } from "./AdCardItem";

interface Props {
  ad: AdPropsPrimitives;
  isActive: boolean;
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
}

export const AdCard = (props: Props) => {
  const { ad, isActive, onLaunchCampaign, handleResponse } = props;
  const redirectionUrl =
    ad.redirectionUrl.length > 30
      ? ad.redirectionUrl.slice(0, 30) + "..."
      : ad.redirectionUrl;

  return (
    <div className="w-72">
      <AdCardItem image={ad.file}>
        <div className="space-y-2">
          <h3 className="font-medium text-gray-600 truncate">{ad.title}</h3>
          <p className="text-gray-500">{`${ad.description.slice(0, 70)}...`}</p>
          <a
            className="text-sky-500 italic truncate"
            href={`${ad.redirectionUrl}`}
          >
            {redirectionUrl}
          </a>
        </div>
        <div className="space-x-5 flex justify-center pt-3">
          <RemoveAdButton handleResponse={handleResponse} adId={ad.id} />
          {!isActive && (
            <PrimaryButton
              type="button"
              onClick={() => {
                onLaunchCampaign(ad);
              }}
            >
              Lanzar
            </PrimaryButton>
          )}
        </div>
      </AdCardItem>
    </div>
  );
};
