import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import Link from "next/link";
import { useState } from "react";
import { CampaignCard } from "./items/CampaignCard";

interface ICampaignsListProps {
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}

export const CampaignsList = ({ campaigns, ads }: ICampaignsListProps) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>();
  const gridCols =
    campaigns.length == 1
      ? "grid-cols-1"
      : campaigns.length == 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div className={` grid ${gridCols}`}>
      {campaigns.map((campaign) => {
        const ad = ads.find((ad) => ad.id == campaign.adId);
        if (!ad) return;
        return (
          <div
            onClick={() =>
              setSelectedCampaign((id) =>
                id === campaign.id ? "" : campaign.id
              )
            }
            key={campaign.id}
            className=" hover:cursor-pointer overflow-hidden rounded-lg"
          >
            <CampaignCard ad={ad} campaign={campaign} />
          </div>
        );
      })}
    </div>
  );
};
