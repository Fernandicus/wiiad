import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

interface Props {
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  onDeleteAd(id: string): void;
}

export function AdsList({
  ads,
  campaigns,
  onLaunchCampaign,
  onDeleteAd,
}: Props) {
  return (
    <div className="w-full  flex items-center">
      <div className="w-full inline-flex justify-center">
        <div
          className={` grid ${
            ads.length == 1
              ? "grid-cols-1"
              : ads.length == 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {ads.map((ad) => {
            const campaign = campaigns.find(
              (campaign) => campaign.adId == ad.id
            );
            return (
              <div key={ad.id} className="relative p-5 w-96">
                <AdCard
                  ad={ad}
                  campaign={!campaign ? null : campaign}
                  onLaunchCampaign={onLaunchCampaign}
                  onDeleteAd={onDeleteAd}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
