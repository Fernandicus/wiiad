import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { AdCardItem } from "../../components/ui/profile/advertiser/AdCardItem";
import { CampaignTags } from "../../components/ui/profile/advertiser/CampaignTags";
import { RoleType } from "@/src/common/domain/Role";
import { ProfileDataController } from "@/src/common/infrastructure/controllers/ProfileDataController";

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
        {props.campaigns.length == 0 ? (
          <h1 className="text-center">Aún no has lanzado ninguna campaña</h1>
        ) : (
          <div
            className={` grid ${
              props.campaigns.length == 1
                ? "grid-cols-1"
                : props.campaigns.length == 2
                ? "grid-cols-2"
                : "grid-cols-3"
            } `}
          >
            {props.campaigns.map((campaign) => {
              const ad = props.ads.find((ad) => ad.id == campaign.adId);
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (!session || session.role === RoleType.USER)
    return { props: {}, redirect: { destination: "/", permanent: false } };

  const paymentIntent = context.query["payment_intent"] as string;

  const advertiserData = await MongoDB.connectAndDisconnect(async () => {
    const profileController = new ProfileDataController();
    const advertiserData = await profileController.getAdvertiserData(
      session.id
    );
    return advertiserData;
  });

  if (paymentIntent)
    return {
      props: advertiserData,
      redirect: { destination: `/${session.name}/campaigns`, permanent: false },
    };
  else
    return {
      props: advertiserData,
    };
};
