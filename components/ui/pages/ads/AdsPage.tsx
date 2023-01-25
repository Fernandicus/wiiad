import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdType } from "@/pages/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useRef, useState } from "react";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../notifications/Notifications";
import { LaunchCampaign } from "../campaigns/LaunchCampaign";
import CreateAdForm from "./CreateAdForm";
import { AdsSection } from "./AdsSection";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { CreateAdSelector } from "./CreateAdSelector";
import CreateAdSection from "./CreateAdSection";
import { useUserStripe } from "@/components/hooks/advertiser/modules/payments/stripe/useUserStripe";

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
  const handleResponse = notificationsRef.current.showNotification;

  const onCreateAd = (adType: AdType) => {
    setAdType(adType);
    setCreateAd(true);
  };

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    setLaunchAd(ad);
  };

  return (
    <main>
      <div className=" min-h-screen bg-slate-100 w-full">
        <Notifications ref={notificationsRef} />
        {!createAd ? (
          <div>
            <CreateAdSelector
              onCreateVideoAd={() => onCreateAd("video")}
              onCreateImageAd={() => onCreateAd("banner")}
            />
            <AdsSection
              handleResponse={handleResponse}
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
      {showPaymentProcess ? (
        <div className=" fixed w-full ">
          <LaunchCampaign
            userName={session.name}
            adToLaunch={launchAd!}
            paymentMethods={userStripe.paymentMethods}
          />
        </div>
      ) : null}
    </main>
  );
};
