import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdType } from "@/pages/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useRef, useState } from "react";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../notifications/Notifications";
import { LaunchCampaignSection } from "../campaigns/LaunchCampaignSection";
import CreateAdSection from "./CreateAdSection";
import { AdsSections } from "./AdsSections";

export const AdsPage = () => {
  const { session } = useAdvertiser();
  const [createAd, setCreateAd] = useState<boolean>(false);
  const [adType, setAdType] = useState<AdType>("banner");
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
  const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();
  const notificationsRef = useRef<RefNotifications>({
    showNotification: () => {},
  });

  const onCreateAd = (adType: AdType) => {
    setAdType(adType);
    setCreateAd(true);
  };

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    setLaunchAd(ad);
  };

  return (
    <main >
      <Notifications ref={notificationsRef} />
      {showPaymentProcess ? (
        <LaunchCampaignSection adToLaunch={launchAd} />
      ) : (
        <div>
          {!createAd ? (
            <AdsSections
              onCreateVideo={() => onCreateAd("video")}
              onCreateBanner={() => onCreateAd("banner")}
              handleResponse={notificationsRef.current.showNotification}
              onLaunchCampaign={onLaunchCampaign}
            />
          ) : (
            <CreateAdSection
              adType={adType}
              user={session}
              handleResponse={(data: NotificationData) => {
                notificationsRef.current!.showNotification(data);
              }}
              onBack={() => {
                setCreateAd(false);
              }}
            />
          )}
        </div>
      )}
    </main>
  );
};
