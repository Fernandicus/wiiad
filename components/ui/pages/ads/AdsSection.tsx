import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { NotificationData } from "../../notifications/Notifications";
import { AdsList } from "./AdsList";
import { EmptyAds } from "./EmptyAds";

export const AdsSection = (params: {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
}) => {
  const { campaigns } = useCampaigns();
  const { ads } = useAds();

  return (
    <div className="py-10">
      {!ads || ads.length == 0 ? (
        <EmptyAds />
      ) : (
        <AdsList
        handleResponse={params.handleResponse}
          onLaunchCampaign={params.onLaunchCampaign}
          campaigns={campaigns.all}
          ads={ads}
        />
      )}
    </div>
  );
};
