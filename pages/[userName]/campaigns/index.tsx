import { AdCard } from "../../../components/ui/profile/advertiser/AdCard";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { findCampaignHandler } from "@/src/modules/campaign/container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps } from "next";
import { AdCardItem } from "../../../components/ui/profile/advertiser/AdCardItem";
import { GridItem } from "../../../components/ui/profile/advertiser/GridItem";

export default function CampaignsPage(props: {
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}) {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="flex justify-center space-x-3">
        <h1 className="font-bold text-center">Estas son tus campañas</h1>
      </div>
      <div className="py-20 w-full inline-flex justify-center">
        <div
          className={` grid grid-cols-${
            props.campaigns.length > 4 ? "4" : props.campaigns.length.toString()
          }`}
        >
          <div className=" flex rounded-md  py-3 justify-between">
            {props.campaigns.map((campaign) => {
              const ad = props.ads.find((ad) => ad.id == campaign.adId);
              return (
                <div key={campaign.id} className="p-5 w-80 ">
                  <AdCardItem image={ad!.image}>
                    <div className=" w-full  inline-flex justify-between ">
                      <p className="text-lg font-semibold">{ad!.title}</p>
                      <button
                        className={`w-20 group bg-lime-300  py-1 px-2 rounded-md text-lime-800 text-sm font-medium ${
                          campaign.status == "active" ? "hover:bg-red-200 hover:text-red-800" : "hover:bg-lime-200"
                        }`}
                      >
                        <div className="group-hover:hidden block">
                          {campaign.status == "active" ? "activa" : "detenida"}
                        </div>
                        <div className="group-hover:block hidden">
                          {campaign.status == "standby" ? "activar" : "detener"}
                        </div>
                      </button>
                    </div>
                    <div className=" flex rounded-md  py-3 justify-between text-sm border-t-2 border-sky-100">
                      <div className="w-full text-center">
                        <p>Visualizaciones</p>
                        <p>{campaign.metrics.totalViews}</p>
                      </div>
                      <div className="w-full text-center">
                        <p>Redirecciones</p>
                        <p>{campaign.metrics.totalClicks}</p>
                      </div>
                    </div>
                  </AdCardItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (!session)
    return { props: {}, redirect: { destination: "/login", permanent: false } };

  const { campaigns, ads } = await MongoDB.connectAndDisconnect(async () => {
    const campaigns = await findCampaignHandler.byAdvertiserId(session.id);
    const ads = await adFinderHandler.findAll(session.id);
    return { campaigns, ads };
  });

  return {
    props: { campaigns, ads },
  };
};
