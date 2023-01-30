import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import Link from "next/link";
import { AdCardItem } from "../../ads/AdCardItem";
import { CampaignTags } from "./CampaignTags";

export const CampaignCard = (props: {
  campaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
}) => {
  const { campaign, ad } = props;
  return (
    <div className="relative">
      <div className="absolute right-0 flex justify-end p-2 w-full">
        <button className="text-xs bg-red-100 text-red-600 p-1 px-3 rounded-md flex">
          Detener
        </button>
      </div>
      <div className="w-72">
        <AdCardItem image={ad!.file}>
          <h3 className="text-md font-semibold truncate">{ad!.title}</h3>
          <p className="text-sm text-gray-500 italic">
            {ad!.description.slice(0, 100) + "..."}
          </p>
          <p className="text-sky-500 text-sm truncate">
            <Link href={ad!.redirectionUrl}>{ad!.redirectionUrl}</Link>
          </p>
          <CampaignTags campaign={campaign} />
        </AdCardItem>
      </div>
    </div>
  );
};
