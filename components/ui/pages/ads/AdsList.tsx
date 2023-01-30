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
  return (
    <div className="w-full max-w-5xl mx-auto ">
      <div className={`w-full inline-flex flex-wrap justify-between`}>
        {ads.map((ad) => {
          const index = campaigns.findIndex((campaign) => {
            return campaign.adId == ad.id;
          });
          const isActive = index === -1 ? false : true;
          return (
            <div key={ad.id}>
              <AdCard
                ad={ad}
                isActive={isActive}
                onLaunchCampaign={onLaunchCampaign}
                handleResponse={handleResponse}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
