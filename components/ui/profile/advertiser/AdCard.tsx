import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { CampaignBudgetProps } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Routes } from "@/src/utils/routes";
import { NotificationData } from "../../notifications/Notifications";

interface Props {
  ad: AdPropsPrimitives;
  handleResponse: (data: NotificationData) => void;
}

export const AdCard = ({ ad, handleResponse }: Props) => {
  const budget: CampaignBudgetProps = {
    maxClicks: 1000,
    moneyToSpend: 50,
  };

  const deleteAd = async (id: string) => {
    try {
      const resp = await fetch(Routes.removeAds, {
        method: "DELETE",
        body: JSON.stringify({ adId: id }),
      });
      if (resp.status !== 200) console.error(resp);
    } catch (err) {}
  };

  const launchCampaign = async (ad: AdPropsPrimitives) => {
    console.log("LAUNCH ", ad.id);
    try {
      const resp = await fetch(Routes.launchCampaign, {
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
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg bg-white shadow-xl shadow-slate-200">
      <img
        src={ad.image}
        className="h-64 w-full object-cover bg-white/70 rounded-lg"
      ></img>
      <div className="p-3">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-600">{ad.title}</h3>
          <p className="text-gray-500">{`${ad.description.slice(0, 70)}...`}</p>
          <a className="text-sky-500 italic" href={`${ad.redirectionUrl}`}>
            {ad.redirectionUrl}
          </a>
        </div>
        <div className="space-x-5 flex justify-center pt-3">
          <button
            className=" bg-red-100 text-red-500 p-2 rounded-md font-medium w-full"
            type="button"
            onClick={() => deleteAd(ad.id)}
          >
            Eliminar anuncio
          </button>
          <button
            className=" bg-sky-500 text-white p-2 rounded-md font-medium w-full"
            type="button"
            onClick={() => launchCampaign(ad)}
          >
            Lanzar campaña
          </button>
        </div>
      </div>
    </div>
  );
};
