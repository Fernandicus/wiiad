import { Balance } from "@/src/domain/Balance";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignBudget,
  CampaignBudgetProps,
} from "@/src/modules/campaign/domain/value-objects/Budget";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { NotificationData } from "../../notifications/Notifications";
import { AdCardItem } from "./AdCardItem";

interface Props {
  ad: AdPropsPrimitives;
  handleResponse: (data: NotificationData) => void;
  campaign: ICampaignPrimitives | null;
}

export const AdCard = ({ ad, handleResponse, campaign }: Props) => {
  const budget = new CampaignBudget({
    clicks: 1000,
    balance: new Balance(5000),
  });

  const deleteAd = async (id: string) => {
    try {
      const resp = await fetch(ApiRoutes.removeAds, {
        method: "DELETE",
        body: JSON.stringify({ adId: id }),
      });
      if (resp.status !== 200) {
        handleResponse({
          message: "No se pudo eliminar el anuncio",
          status: 400,
        });
      } else {
        handleResponse({
          message: "Anuncio eliminado",
          status: 0,
        });
      }
    } catch (err) {
      handleResponse({
        message: "No se pudo eliminar el anuncio",
        status: 400,
      });
    }
  };

  const launchCampaign = async (ad: AdPropsPrimitives) => {
    console.log("LAUNCH ", ad.id);
    try {
      const resp = await fetch(ApiRoutes.launchCampaign, {
        method: "POST",
        body: JSON.stringify({
          id: ad.id,
          budget,
        }),
      });
      if (resp.status === 200) {
        console.log("NEW CAMPAIGN LAUNCHED");
        handleResponse({ message: "Nueva campaña lanzada!", status: 0 });
      }
    } catch (err) {
      handleResponse({ message: "No se pudo lanzar la campaña", status: 400 });
    }
  };

  return (
    <AdCardItem image={ad.image}>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-600">{ad.title}</h3>
        <p className="text-gray-500">{`${ad.description.slice(0, 70)}...`}</p>
        <a className="text-sky-500 italic" href={`${ad.redirectionUrl}`}>
          {ad.redirectionUrl}
        </a>
      </div>
      <div className="space-x-5 flex justify-center pt-3">
        <button
          className="text-sm bg-red-100 hover:bg-red-500 text-red-500 hover:text-white py-1 px-2 rounded-md font-medium w-full"
          type="button"
          onClick={() => deleteAd(ad.id)}
        >
          Eliminar anuncio
        </button>
        <button
          className={`text-sm ${
            campaign
              ? "bg-slate-200 text-slate-400"
              : "bg-sky-500 hover:bg-sky-400 text-white"
          }   p-2 rounded-md font-medium w-full`}
          type="button"
          onClick={campaign ? undefined : () => launchCampaign(ad)}
        >
          {!campaign ? (
            <span>Lanzar campaña</span>
          ) : (
            <span>Campaña lanzada</span>
          )}
        </button>
      </div>
    </AdCardItem>
  );
};
