import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudgetProps } from "@/src/modules/campaign/domain/value-objects/Budget";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { NotificationData } from "../../notifications/Notifications";

interface Props {
  ad: AdPropsPrimitives;
  handleResponse: (data: NotificationData) => void;
  campaign: ICampaignPrimitives | null;
}

export const AdCard = ({ ad, handleResponse, campaign }: Props) => {
  const budget: CampaignBudgetProps = {
    maxClicks: 1000,
    moneyToSpend: 50,
  };

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
    <div className="w-full max-w-sm rounded-lg bg-white shadow-xl shadow-slate-200">
      <img
        src={ad.image}
        className="h-64 w-full object-cover bg-white/70 rounded-t-lg"
      ></img>
      <div className="p-3 space-y-2">
        {campaign && (
          <div className=" flex justify-center space-x-5 rounded-md bg-sky-50 py-4">
            <div className="w-full text-center">
              <p>Visualizaciones</p>
              <p>{campaign?.watchers.length}</p>
            </div>
            <div className="w-full text-center">
              <p>Redirecciones</p>
              <p>0</p>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-600">{ad.title}</h3>
          <p className="text-gray-500">{`${ad.description.slice(0, 70)}...`}</p>
          <a className="text-sky-500 italic" href={`${ad.redirectionUrl}`}>
            {ad.redirectionUrl}
          </a>
        </div>
        <div className="space-x-5 flex justify-center pt-3">
          <button
            className=" bg-red-100 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-md font-medium w-full"
            type="button"
            onClick={() => deleteAd(ad.id)}
          >
            Eliminar anuncio
          </button>
          <button
            className={`${
              campaign
                ? "bg-slate-200 text-slate-400"
                : "bg-sky-500 hover:bg-sky-400 text-white"
            }   p-2 rounded-md font-medium w-full`}
            type="button"
            onClick={campaign ? () => launchCampaign(ad) : undefined}
          >
            {!campaign ? (
              <span>Lanzar campaña</span>
            ) : (
              <span>Campaña lanzada</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
