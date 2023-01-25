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

export const AdsPage = () => {
  const { userStripe, session } = useAdvertiser();
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

  const deleteAd = async (id: string) => {
    const handleResponse = notificationsRef.current.showNotification;
    try {
      const resp = await fetch(ApiRoutes.removeAds, {
        method: "DELETE",
        body: JSON.stringify({ adId: id }),
      });
      if (resp.status !== 200) {
        handleResponse({
          message: "No se pudo eliminar el anuncio",
          status: "error",
        });
      } else {
        handleResponse({
          message: "Anuncio eliminado",
          status: "success",
        });
        window.location.reload();
      }
    } catch (err) {
      handleResponse({
        message: "No se pudo eliminar el anuncio",
        status: "error",
      });
    }
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
              onDeleteAd={deleteAd}
              onLaunchCampaign={onLaunchCampaign}
            />
          </div>
        ) : (
          <CreateAdSection
            adType={adType}
            onBack={() => {
              setCreateAd(false);
            }}
            user={session}
            handleResponse={(data: NotificationData) => {
              notificationsRef.current!.showNotification(data);
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
