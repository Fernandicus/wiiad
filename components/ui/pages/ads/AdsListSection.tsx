import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { NotificationData } from "../../notifications/Notifications";
import { AdsList } from "./AdsList";
import { EmptyAds } from "./EmptyAds";

export const AdsListSection = (params: {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
}) => {
  const { campaigns } = useCampaigns();
  const { ads } = useAds();

  return (
    <div>
      {!ads || ads.length == 0 ? (
        <EmptyAds />
      ) : (
        <div className="w-full  mx-auto">
          {ads.length > 2 ? (
            <div className={` grid-cols-3 w-full grid gap-16`}>
              <AdsList
                handleResponse={params.handleResponse}
                onLaunchCampaign={params.onLaunchCampaign}
                campaigns={campaigns.actives}
                ads={ads}
              />
            </div>
          ) : ads.length <= 2 ? (
            <div className={`w-full inline-flex justify-around`}>
              <AdsList
                handleResponse={params.handleResponse}
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
