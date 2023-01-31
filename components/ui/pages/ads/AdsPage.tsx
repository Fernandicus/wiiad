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
import { AdsSection } from "./AdsSection";
import { CreateAdSelector } from "./CreateAdSelector";
import CreateAdSection from "./CreateAdSection";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { AdSectionHeader } from "./AdSectionHeader";

export const AdsPage = () => {
  const { session } = useAdvertiser();
  const { userStripe } = useUserStripe();
  const [createAd, setCreateAd] = useState<boolean>(false);
  const [adType, setAdType] = useState<AdType>("banner");
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
  const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();
  const notificationsRef = useRef<RefNotifications>({
    showNotification: () => {},
  });
  // const handleResponse = notificationsRef.current.showNotification;

  const onCreateAd = (adType: AdType) => {
    setAdType(adType);
    setCreateAd(true);
  };

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    setLaunchAd(ad);
  };

  return (
    <main className="">
      {showPaymentProcess ? (
        <LaunchCampaignSection adToLaunch={launchAd} />
      ) : (
        <div className="">
          <Notifications ref={notificationsRef} />
          {!createAd ? (
            <div>
              <AdSectionHeader
                titleLabel="Tus anuncios"
                descriptionLabel="Crea y lanza anuncios de tipo video o banner"
                onCreateVideo={() => onCreateAd("video")}
                onCreateBanner={() => onCreateAd("banner")}
              />
              <AdsSection
                handleResponse={notificationsRef.current.showNotification}
                onLaunchCampaign={onLaunchCampaign}
              />
            </div>
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
