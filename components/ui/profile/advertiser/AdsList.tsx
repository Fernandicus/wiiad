import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { CampaignBudgetProps } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Dispatch, SetStateAction } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

interface Props {
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  createAd: Dispatch<SetStateAction<boolean>>;
  handleResponse: (data: NotificationData) => void;
}

export function AdsList({ ads, createAd, handleResponse, campaigns }: Props) {
  return (
    <div className="w-full py-10">
      <div className="flex justify-center space-x-3">
        <h1 className="font-bold text-center">Estos son tus anuncios</h1>
        <button
          className="text-sky-500 hover:text-sky-400 w-5"
          onClick={() => createAd(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="py-20 w-full inline-flex justify-center">
        <div
          className={` grid grid-cols-${
            ads.length > 4 ? "4" : ads.length.toString()
          }`}
        >
          <div className=" flex rounded-md  py-3 justify-between">
            {ads.map((ad) => {
              const campaign = campaigns.find(
                (campaign) => campaign.adId == ad.id
              );
              return (
                <div key={ad.id} className="p-5 w-96">
                  <AdCard
                    ad={ad}
                    handleResponse={handleResponse}
                    campaign={!campaign ? null : campaign}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
