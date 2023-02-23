import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useNotification } from "../../../hooks/useNotification";

interface AdViewParams {
  user: IUserPrimitives | null;
  campaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referrer: IUserPrimitives;
}

export default function AdView({ campaign, ad, referrer, user }: AdViewParams) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canEarnMoney, setCanEarnMoney] = useState<boolean>(false);
  const { setNotification } = useNotification();

  const pay = () => {
    if (user && user.role !== RoleType.USER) {
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
  };

  useEffect(() => {
    if (videoRef.current && videoRef.current.duration) {
      /* videoRef.current.muted = false; */
      setTimeout(() => {
        setCanEarnMoney(true);
        console.log("EARN MONEY");
        console.log(videoRef.current?.duration);
      }, videoRef.current!.duration * 1000);
    } else {
      setTimeout(() => {
        setCanEarnMoney(true);
      }, 5 * 1000);
    }
  }, [videoRef.current]);

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center">
      {!user ? (
        <Link href="/" className=" text-blue-500 ">
          <span className="underline">Iniciar sesion</span> 👈
        </Link>
      ) : null}
      <div className="max-w-xl space-y-20 pt-10">
        <div className="flex justify-center">
          <div className="flex items-center w-full p-2 bg-white rounded-full shadow-lg shadow-slate-200">
            <div className="flex w-full items-center h-full space-x-5">
              <img
                src={referrer.profilePic}
                width={200}
                height={200}
                className="rounded-full h-14 w-14 object-cover"
              ></img>
              <div className="flex items-center ">
                <div className=" ">
                  <p className="">Apolla a {referrer.name} viendo este anuncio</p>
                  <p className="italic text-gray-500">
                    wiiad.com/{referrer.name}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={canEarnMoney ? pay : waitToSeeTheAd}
              className={`${
                canEarnMoney
                  ? "group  bg-green-400 hover:cursor-pointer hover:bg-white flex items-center justify-center shadow-inner shadow-green-500 hover:shadow-slate-300"
                  : "group-hover:text-gray-400 bg-gray-400"
              } rounded-full`}
            >
              <div
                className={`p-2.5 w-14 h-full text-white ${
                  canEarnMoney
                    ? "group-hover:text-green-400 group-hover:transition ease-out duration-300"
                    : "group-hover:text-gray-400"
                }  `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full space-y-2">
          <h1 className="text-lg font-bold text-gray-700">{ad.title}</h1>
          <div className="space-y-5">
            {ad.file.includes(".mp4") ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                controls
                className="w-[576px] h-[324px] object-cover  bg-slate-200 rounded-lg"
              >
                <source src={ad.file} type="video/mp4" />
                Tu navegador no el formato de video mp4
              </video>
            ) : (
              <img
                src={ad.file}
                alt="alt"
                className="w-[576px] h-[324px] object-cover  bg-slate-200 rounded-lg"
              ></img>
            )}
            <p className=" text-slate-600 text-sm">{ad.description}</p>
            <div>
              <Link
                onClick={() => {
                  console.log("REDIRECT");
                  fetch(ApiRoutes.campaign_metrics_increase_clicks, {
                    method: "POST",
                    body: JSON.stringify({
                      campaignId: campaign.id,
                    }),
                  });
                }}
                href={ad.redirectionUrl}
                passHref
                target="_blank"
              >
                <div className="w-full p-2 bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-slate-300 rounded-md text-center">
                  Visitar web
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
