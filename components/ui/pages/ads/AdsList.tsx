import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { NotificationData } from "../../notifications/Notifications";

interface Props {
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
}

export function AdsList({
  ads,
  campaigns,
  onLaunchCampaign,
  handleResponse,
}: Props) {
  const gridCols =
    ads.length == 1
      ? "grid-cols-1"
      : ads.length == 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div className="w-full  flex items-center">
      <div className="w-full inline-flex justify-center">
        <div className={` grid ${gridCols}`}>
          {ads.map((ad) => {
            const campaign = campaigns.find(
              (campaign) => campaign.adId == ad.id
            );
            return (
              <div key={ad.id} className="p-5 w-96">
                <AdCard
                  ad={ad}
                  campaign={!campaign ? null : campaign}
                  onLaunchCampaign={onLaunchCampaign}
                 handleResponse={handleResponse}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
