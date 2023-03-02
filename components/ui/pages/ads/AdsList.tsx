import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { WrappedList } from "./WrappedList";

interface Props {
  cols?: number;
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  onLaunchCampaign(ad: AdPropsPrimitives): void;
}

export function AdsList({ ads, cols, campaigns, onLaunchCampaign }: Props) {
  /*   const positionAlign = (index: number): string =>
    index == 0
      ? "justify-start"
      : index + 1 == cols
      ? "justify-end"
      : "justify-center"; */

  return (
    <>
      {ads.map((ad, index) => {
        const indexFound = campaigns.findIndex(
          (campaign) => campaign.adId == ad.id
        );
        const isActive = indexFound === -1 ? false : true;
        return (
          <div key={index}>
            {cols ? (
              <WrappedList cols={cols} componentIndex={index}>
                <AdCard
                  ad={ad}
                  isActive={isActive}
                  onLaunchCampaign={onLaunchCampaign}
                />
              </WrappedList>
            ) : (
              <AdCard
                ad={ad}
                isActive={isActive}
                onLaunchCampaign={onLaunchCampaign}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
