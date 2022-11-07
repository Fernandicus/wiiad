import { AdCard } from "./AdCard";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { CampaignBudgetProps } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Dispatch, SetStateAction } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { AdResourceSelector } from "./AdResourceSelector";
import { AdType } from "@/pages/[userName]/ads";

interface Props {
  ads: AdPropsPrimitives[];
  campaigns: ICampaignPrimitives[];
  onCreateAd: Dispatch<SetStateAction<AdType | null>>;
  handleResponse: (data: NotificationData) => void;
}

export function AdsList({ ads, onCreateAd, handleResponse, campaigns }: Props) {
  return (
    <div className="w-full py-10">
      <div className="space-y-5">
        <div className="space-y-3">
        <h1 className="font-bold text-center text-slate-600">
          Crea un anuncio
        </h1>
        <AdResourceSelector
          onCreateVideoAd={() => onCreateAd("video")}
          onCreateImageAd={() =>  onCreateAd("banner")}
        />
        </div>
      </div>
      <div className="py-14 w-full inline-flex justify-center">
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
