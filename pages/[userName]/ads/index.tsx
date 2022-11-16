import CreateAdForm from "../../../components/ui/profile/CreateAdForm";
import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { RoleType } from "@/src/domain/Role";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useRef, useState } from "react";
import { EmptyAds } from "../../../components/ui/profile/advertiser/EmptyAds";
import { AdsList } from "../../../components/ui/profile/advertiser/AdsList";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../../components/ui/notifications/Notifications";
import { findCampaignHandler } from "@/src/modules/campaign/container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { LaunchCampaign } from "../../../components/ui/profile/advertiser/LaunchCampaign";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/stripe-container";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Balance } from "@/src/domain/Balance";
import { ApiRoutes } from "@/src/utils/ApiRoutes";

export type AdType = "banner" | "video";

interface IAdsPageProps {
  advertiser: AdvertiserPropsPrimitives;
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  stripeCustomer?: IStripePrimitives;
}

export default function Ads(props: IAdsPageProps) {
  const advertiser: AdvertiserPropsPrimitives = props.advertiser;
  const ads: AdPropsPrimitives[] = props.ads;
  const campaigns: ICampaignPrimitives[] = props.campaigns;
  const [createAd, setCreateAd] = useState<AdType | null>(null);
  const notificationsRef = useRef<RefNotifications>({
    showNotification: (data: NotificationData) => {},
  });
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();

/*   const budget = new CampaignBudget({
    clicks: 1000,
    balance: new Balance(5000),
  });

  const launchCampaign = async (ad: AdPropsPrimitives) => {
    console.log("LAUNCH ", ad.id);
    if (isLaunching) return;
    setIsLaunching(true);
    notificationsRef.current!.showNotification({
      message: "Lanzando campaña ...",
      status: "info",
    });

    try {
      const resp = await fetch(ApiRoutes.launchCampaign, {
        method: "POST",
        body: JSON.stringify({
          id: ad.id,
          budget,
        }),
      });
      setIsLaunching(false);
      if (resp.status === 200) {
        console.log("NEW CAMPAIGN LAUNCHED");
        notificationsRef.current!.showNotification({
          message: "Nueva campaña lanzada!",
          status: "success",
        });
      }
      window.location.reload();
    } catch (err) {
      setIsLaunching(false);
      notificationsRef.current!.showNotification({
        message: "No se pudo lanzar la campaña",
        status: "error",
      });
    }
  }; */

  const onLaunchCampaign = (ad: AdPropsPrimitives) => {
    setPaymentProcess(true);
    setLaunchAd(ad);
  };

  return (
    <div>
      <main className="absolute min-h-screen bg-slate-100 w-full flex justify-center">
        <Notifications ref={notificationsRef} />
        {!createAd && (
          <div className="w-full">
            {!ads || ads.length == 0 ? (
              <EmptyAds onTapCreateAd={setCreateAd} />
            ) : (
              <AdsList
                onLaunchCampaign={onLaunchCampaign}
                campaigns={campaigns}
                ads={ads}
                onCreateAd={setCreateAd}
                handleResponse={(data: NotificationData) => {
                  notificationsRef.current!.showNotification(data);
                }}
              />
            )}
          </div>
        )}
        {createAd && (
          <CreateAdForm
            createAd={createAd}
            onBack={() => {
              setCreateAd(null);
            }}
            user={advertiser}
            handleResponse={(data: NotificationData) => {
              notificationsRef.current!.showNotification(data);
            }}
          />
        )}
      </main>
      {showPaymentProcess ? (
        <div className=" fixed w-full ">
          <LaunchCampaign
            adToLaunch={launchAd!}
            paymentMethods={props.stripeCustomer?.paymentMethods}
          />
        </div>
      ) : null}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = userSession.getFromServer(context);
    if (!session || session.role === RoleType.USER)
      throw new Error("The session do not have access");

    const { ads, campaigns, stripeCustomer } =
      await MongoDB.connectAndDisconnect(async () => {
        const ads = await adFinderHandler.findAll(session.id);
        const campaigns = await findCampaignHandler.byAdvertiserId(session.id);
        const stripeCustomer = await findCustomerHandler.findByUserId(
          session.id
        );

        return { ads, campaigns, stripeCustomer };
      });

    return {
      props: {
        advertiser: { ...session } as IGenericUserPrimitives,
        ads,
        campaigns,
        stripeCustomer,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
