import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { assertUnreachable } from "@/src/utils/helpers";
import { useEffect, useState } from "react";
import { CampaignsList } from "./CampaignsList";
import { EmptyCampaigns } from "./items/EmptyCampaigns";

export const CampaignsPage = () => {
  const { ads, campaigns } = useAdvertiser();
  const [selectedCampaign, setCampaign] = useState<CampaignStatusType>(
    CampaignStatusType.ACTIVE
  );

  const selected = (status: CampaignStatusType): string =>
    selectedCampaign === status ? "text-sky-500" : "text-gray-500";

  const getComponent = (campaignList: ICampaignPrimitives[]): JSX.Element => {
    return campaigns.all.length == 0 ? (
      <EmptyCampaigns noCampaignsCreated />
    ) : campaignList.length == 0 ? (
      <EmptyCampaigns />
    ) : (
      <CampaignsList ads={ads} campaigns={campaignList} />
    );
  };

  const campaignList: Record<CampaignStatusType, JSX.Element> = {
    active: getComponent(campaigns.actives),
    finished: getComponent(campaigns.finished),
    standBy: getComponent(campaigns.standBy),
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <h1 className="font-bold text-center py-5">Estas son tus campañas</h1>
      <div className="flex justify-center space-x-5">
        <button
          className={selected(CampaignStatusType.ACTIVE)}
          onClick={() => setCampaign(CampaignStatusType.ACTIVE)}
        >
          Activas ({campaigns.actives.length})
        </button>
        <button
          className={selected(CampaignStatusType.STAND_BY)}
          onClick={() => setCampaign(CampaignStatusType.STAND_BY)}
        >
          Detenidas ({campaigns.standBy.length})
        </button>
        <button
          className={selected(CampaignStatusType.FINISHED)}
          onClick={() => setCampaign(CampaignStatusType.FINISHED)}
        >
          Finalizadas ({campaigns.finished.length})
        </button>
      </div>
      <div className="w-full inline-flex justify-center py-10">
        {campaignList[selectedCampaign]}
      </div>
    </div>
  );
};
