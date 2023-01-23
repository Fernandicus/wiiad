import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdType } from "@/pages/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdsList } from "./AdsList";
import { EmptyAds } from "./EmptyAds";

export const AdsSection = (params: {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  onDeleteAd(id: string): void;
}) => {
  const { ads, campaigns } = useAdvertiser();

  return (
    <div className="w-full py-10">
      {!ads || ads.length == 0 ? (
        <EmptyAds />
      ) : (
        <AdsList
          onDeleteAd={params.onDeleteAd}
          onLaunchCampaign={params.onLaunchCampaign}
          campaigns={campaigns}
          ads={ads}
        />
      )}
    </div>
  );
};
