import CreateAdForm from "../../../components/ui/profile/CreateAdForm";
import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { RoleType } from "@/src/domain/Role";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  CampaignBudget,
  CampaignBudgetProps,
} from "@/src/modules/campaign/domain/value-objects/Budget";
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

export default function Ads(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const advertiser: AdvertiserPropsPrimitives = props.advertiser;
  const ads: AdPropsPrimitives[] = props.ads;
  const campaigns: ICampaignPrimitives[] = props.campaigns;
  const [createAd, setCreateAd] = useState<boolean>(false);
  const notificationsRef = useRef<RefNotifications>({
    showNotification: (data: { status: number; message: string }) => {},
  });

  return (
    <main className="flex items-center justify-center bg-slate-100 w-full min-h-screen">
      <Notifications ref={notificationsRef} />
      {!createAd && (
        <div className="w-full">
          {ads.length == 0 ? (
            <EmptyAds onTapCreateAd={setCreateAd} />
          ) : (
            <AdsList
              campaigns={campaigns}
              ads={ads}
              createAd={setCreateAd}
              handleResponse={(data: NotificationData) => {
                notificationsRef.current!.showNotification(data);
              }}
            />
          )}
        </div>
      )}
      {createAd && (
        <CreateAdForm
          user={advertiser}
          handleResponse={(data: NotificationData) => {
            notificationsRef.current!.showNotification(data);
          }}
        />
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = userSession.getFromServer(context);
    if (!session || session.role === RoleType.USER)
      throw new Error("The session do not have access");

    const { ads, campaigns } = await MongoDB.connectAndDisconnect(async () => {
      const ads = await adFinderHandler.findAll(session.id);
      const campaigns = await findCampaignHandler.byAdvertiserId(session.id);
      return { ads, campaigns };
    });

    return {
      props: {
        advertiser: { ...session } as IGenericUserPrimitives,
        ads,
        campaigns,
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
