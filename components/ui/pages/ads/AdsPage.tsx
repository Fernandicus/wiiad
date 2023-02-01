import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdType } from "@/pages/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useRef, useState } from "react";
import { LaunchCampaignSection } from "../campaigns/LaunchCampaignSection";
import CreateAdSection from "./CreateAdSection";
import { AdsSections } from "./AdsSections";
import { Notification } from "../../notifications/Notification";
import { useNotification } from "../../notifications/hooks/useNotification";

export const AdsPage = () => {
  const [createAd, setCreateAd] = useState<boolean>(false);
  const [adType, setAdType] = useState<AdType>("banner");
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
  const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();

  const onCreateAd = (adType: AdType) => {
    setAdType(adType);
    setCreateAd(true);
  };

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    setLaunchAd(ad);
  };

  const {setNotification} =useNotification()
  return (
    <main>
      <button onClick={()=>{
setNotification({message:"Prueba", status:"success"})
      }}>Boton</button>
      {showPaymentProcess ? (
        <LaunchCampaignSection adToLaunch={launchAd} />
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
