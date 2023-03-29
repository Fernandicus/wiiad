import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useNotification } from "../../../hooks/useNotification";
import { WatchAdSection } from "./WatchAdSection";
import { CristalCardItem } from "../../items/CristalCardItem";
import { useWatchingAd } from "@/components/hooks/ad-watcher/useWatchingAd";

interface AdViewParams {
  refereeId: string;
  campaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referrer: IUserPrimitives;
}

export default function AdView({
  campaign,
  ad,
  referrer,
  refereeId,
}: AdViewParams) {
  const [canEarnMoney, setCanEarnMoney] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const [showTitle, setShowTitle] = useState(true);

  const { disconnect, connect, connectionMessage, events } = useWatchingAd({
    no_auth_user_id: refereeId,
    referrerId: referrer.id,
  });

 /*  useMemo(() => {
    setNotification({ message: connectionMessage, status: "info" });
  }, [connectionMessage]); */

  /*   const increaseMetrics = () => {
    fetch(ApiRoutes.campaign_metrics_increase_clicks, {
      method: "POST",
      body: JSON.stringify({
        campaignId: campaign.id,
      }),
    });
  };

  const pay = () => {
    // if (!canEarnMoney) return;
    if (refereeId.includes("anonym")) {
      console.log(refereeId);
      setNotification({
        message: `Los perfiles de anunciante no pueden ganar dinero viendo anuncios`,
        status: "error",
      });
      return;
    }
    setCanEarnMoney(false);
    fetch(ApiRoutes.addReferral, {
      method: "POST",
      body: JSON.stringify({
        referrerId: referrer.id,
        campaign,
      }),
    })
      .then(async (resp) => {
        increaseMetrics();
        const respJSON = await resp.json();
        if (resp.status === 200) {
          setNotification({
            message: `Has recibido ${respJSON["increasedBalance"]} centimos !`,
            status: "success",
          });
        } else if (resp.status === 401) {
          setNotification({
            message: "Inicia sesion para recibir el pago",
            status: "info",
          });
        } else {
          setNotification({
            message: respJSON["message"],
            status: "error",
          });
        }
      })
      .catch(async (err) => {
        const respJSON = await err.json();
        setNotification({
          message: respJSON["message"],
          status: "error",
        });
      });
  };

  const waitToSeeTheAd = () => {
    setNotification({
      message: "Tienes que terminar de ver el anuncio",
      status: "info",
    });
  }; */

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center items-center">
      <CristalCardItem>
        <div className="max-w-xl">
          <div className="w-full space-y-2">
            <h1
              className={`${
                !showTitle ? "opacity-100 visible" : "opacity-0 invisible"
              } text-lg font-bold text-gray-700`}
            >
              {ad.title}
            </h1>

            <WatchAdSection
              onMonetizeAd={() => {
                events.finishWatchingAd();
              }}
              adBannerAlt={ad.title}
              onWatchAd={() => {
                setShowTitle(false);
                events.startWatchingAd();
              }}
              adDescription={ad.description}
              adRedirectionUrl={ad.redirectionUrl}
              adFile={ad.file}
              referrerProfilePic={referrer.profilePic}
              referrerName={referrer.name}
            />
          </div>
        </div>
      </CristalCardItem>
    </div>
  );
}
