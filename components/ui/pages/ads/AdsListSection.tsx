import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { LoadingSpinnerAnimation } from "../../icons/LoadingSpinnerAnimation";
import { LoadingSection } from "../items/LoadingSection";
import { AdsList } from "./AdsList";
import { EmptyAds } from "./EmptyAds";

export const AdsListSection = (params: {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
}) => {
  const { campaigns } = useCampaigns();
  const { ads } = useAds();
  const { status } = useAdvertiser();

  if (status === "non-init") return <LoadingSection />;

  return (
    <div>
      {!ads || ads.length == 0 ? (
        <EmptyAds />
      ) : (
        <div className="w-full  mx-auto">
          {ads.length > 2 ? (
            <div className={` grid-cols-3 w-full grid gap-16`}>
              <AdsList
                onLaunchCampaign={params.onLaunchCampaign}
                campaigns={campaigns.actives}
                ads={ads}
              />
            </div>
          ) : ads.length <= 2 ? (
            <div className={`w-full inline-flex justify-around`}>
              <AdsList
                onLaunchCampaign={params.onLaunchCampaign}
                campaigns={campaigns.actives}
                ads={ads}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
