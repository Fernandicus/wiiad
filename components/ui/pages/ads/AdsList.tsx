import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

interface Props {
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  onLaunchCampaign(ad: AdPropsPrimitives): void;
}

export function AdsList({
  ads,
  campaigns,
  onLaunchCampaign,
}: Props) {
  return (
    <>
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
            />
          </div>
        );
      })}
    </>
  );
}
