import { AdType } from "@/pages/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useState } from "react";
import { LaunchCampaignSection } from "../campaigns/LaunchCampaignSection";
import CreateAdSection from "./CreateAdSection";
import { AdsSections } from "./AdsSections";
import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";

export const AdsPage = () => {
  const [createAd, setCreateAd] = useState<boolean>(false);
  const [adType, setAdType] = useState<AdType>("banner");
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
 // const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();
  const { storeAdToLaunch } = usePaymentProcess();

  const onCreateAd = (adType: AdType) => {
    setAdType(adType);
    setCreateAd(true);
  };

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    storeAdToLaunch(ad);
  };

  return (
    <main>
      {showPaymentProcess ? (
        <LaunchCampaignSection />
      ) : (
        <div>
          {!createAd ? (
            <AdsSections
              onCreateVideo={() => onCreateAd("video")}
              onCreateBanner={() => onCreateAd("banner")}
              onLaunchCampaign={onLaunchCampaign}
            />
          ) : (
            <CreateAdSection
              adType={adType}
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
