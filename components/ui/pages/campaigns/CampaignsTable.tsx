import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import Link from "next/link";
import { useState } from "react";
import { CampaignCard } from "./items/CampaignCard";
import { CampaignsTableHeader } from "./items/CampaignsTableHeader";
import { CampaignTableRow } from "./items/CampaignTableRow";

interface ICampaignsListProps {
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}

export const CampaignsTable = ({ campaigns, ads }: ICampaignsListProps) => {
  return (
    
    <div className="p-1 max-h40 overflow-y-scroll bg-white rounded-xl max-w-xl md:max-w-3xl lg:max-w-none  overflow-hidden overflow-x-scroll">
      <table className="table-auto bg-white overflow-hidden rounded-lg">
        <CampaignsTableHeader />
        <tbody>
          {campaigns.map((campaign) => {
            const ad = ads.find((ad) => ad.id == campaign.adId);
            if (!ad) return;
            return <CampaignTableRow ad={ad} campaign={campaign} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
