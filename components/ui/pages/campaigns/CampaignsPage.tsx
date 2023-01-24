import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdCardItem } from "../ads/AdCardItem";
import { CampaignTags } from "./CampaignTags";

export const CampaignsPage = () => {
  const { ads, campaigns } = useAdvertiser();

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="flex justify-center space-x-3">
        <h1 className="font-bold text-center">Estas son tus campañas</h1>
      </div>
      <div className="py-20 w-full inline-flex justify-center">
        {campaigns.length == 0 ? (
          <h1 className="text-center">Aún no has lanzado ninguna campaña</h1>
        ) : (
          <div
            className={` grid ${
              campaigns.length == 1
                ? "grid-cols-1"
                : campaigns.length == 2
                ? "grid-cols-2"
                : "grid-cols-3"
            } `}
          >
            {campaigns.map((campaign) => {
              const ad = ads.find((ad) => ad.id == campaign.adId);
              return (
                <div key={campaign.id} className="p-5 w-80">
                  <AdCardItem image={ad!.file}>
                    <CampaignTags campaign={campaign} />
                    <p className="text-md font-semibold truncate">
                      {ad!.title}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {ad!.description}
                    </p>
                  </AdCardItem>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
