import CreateAdForm from "../../components/ui/pages/ads/CreateAdForm";
import { RoleType } from "@/src/common/domain/Role";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useRef, useState } from "react";
import { EmptyAds } from "../../components/ui/pages/profile/advertiser/EmptyAds";
import { AdsList } from "../../components/ui/pages/profile/advertiser/AdsList";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../components/ui/notifications/Notifications";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { LaunchCampaign } from "../../components/ui/pages/profile/advertiser/LaunchCampaign";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ProfileDataController } from "@/src/common/infrastructure/controllers/ProfileDataController";

export type AdType = "banner" | "video";

interface IAdsPageProps {
  advertiser: IUserPrimitives;
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  stripeCustomer?: IStripePrimitives;
}

export default function Ads(props: IAdsPageProps) {
  const advertiser: IUserPrimitives = props.advertiser;
  const ads: AdPropsPrimitives[] = props.ads;
  const campaigns: ICampaignPrimitives[] = props.campaigns;
  const [createAd, setCreateAd] = useState<AdType | null>(null);
  const notificationsRef = useRef<RefNotifications>({
    showNotification: (data: NotificationData) => {},
  });
  const [showPaymentProcess, setPaymentProcess] = useState<boolean>(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchAd, setLaunchAd] = useState<AdPropsPrimitives>();

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
            userName={advertiser.name}
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

    const advertiserData = await MongoDB.connectAndDisconnect(async () => {
      const profileController = new ProfileDataController();
      const advertiserData = await profileController.getAdvertiserData(
        session.id
      );
      return advertiserData;
    });

    return {
      props: {
        ...advertiserData,
        advertiser: { ...session } as IUserPrimitives,
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
