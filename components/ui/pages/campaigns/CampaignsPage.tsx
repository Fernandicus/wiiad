import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { useState } from "react";
import { SectionHeader } from "../items/SectionHeader";
import { CampaignsTable } from "./CampaignsTable";
import { EmptyCampaigns } from "./items/EmptyCampaigns";

export const CampaignsPage = () => {
  const { campaigns } = useCampaigns();
  const { ads } = useAds();
  const [selectedCampaign, setCampaign] = useState<CampaignStatusType>(
    CampaignStatusType.ACTIVE
  );

  const selected = (status: CampaignStatusType): string =>
    selectedCampaign === status
      ? "text-sky-500 underline underline-offset-8"
      : "text-gray-600 ";

  const getComponent = (campaignList: ICampaignPrimitives[]): JSX.Element => {
    return campaigns.all.length == 0 ? (
      <EmptyCampaigns noCampaignsCreated />
    ) : campaignList.length == 0 ? (
      <EmptyCampaigns />
    ) : (
      <CampaignsTable ads={ads} campaigns={campaignList} />
    );
  };

  const campaignList: Record<CampaignStatusType, JSX.Element> = {
    active: getComponent(campaigns.actives),
    finished: getComponent(campaigns.finished),
    standBy: getComponent(campaigns.standBy),
  };

  return (
    <div className="min-h-screen">
      <SectionHeader
        titleLable="Tus campañas"
        descriptionLabel="Aquí podrás analizar las metricas de todas tus campañas"
      >
        <div className="flex justify-center space-x-5 ">
          <button
            className={`${selected(CampaignStatusType.ACTIVE)}`}
            onClick={() => setCampaign(CampaignStatusType.ACTIVE)}
          >
            Activas ({campaigns.actives.length})
          </button>
          <button
            className={`${selected(CampaignStatusType.STAND_BY)} `}
            onClick={() => setCampaign(CampaignStatusType.STAND_BY)}
          >
            Detenidas ({campaigns.standBy.length})
          </button>
          <button
            className={`${selected(CampaignStatusType.FINISHED)} `}
            onClick={() => setCampaign(CampaignStatusType.FINISHED)}
          >
            Finalizadas ({campaigns.finished.length})
          </button>
        </div>
      </SectionHeader>

      
        {campaignList[selectedCampaign]}
     
    </div>
  );
};
