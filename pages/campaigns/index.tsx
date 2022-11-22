import { AdCard } from "../../components/ui/profile/advertiser/AdCard";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { findCampaignHandler } from "@/src/modules/campaign/container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps } from "next";
import { AdCardItem } from "../../components/ui/profile/advertiser/AdCardItem";
import { CampaignTags } from "../../components/ui/profile/advertiser/CampaignTags";
import { AdvertiserDataController } from "@/src/modules/advertiser/controller/AdvertiserDataController";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import {
  findCustomerHandler,
  getPaymentDetailsHandler,
  updateStripeHandler,
} from "@/src/modules/payment-methods/stripe/stripe-container";
import { UniqId } from "@/src/utils/UniqId";
import { RoleType } from "@/src/domain/Role";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Balance } from "@/src/domain/Balance";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/PaymentAmount";

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

  const { campaigns, ads } = await MongoDB.connectAndDisconnect(async () => {
    const all = await AdvertiserDataController.getAll(session.id);
    return all;
  });

  if (paymentIntent)
    return {
      props: { campaigns, ads },
      redirect: { destination: `/${session.name}/campaigns`, permanent: false },
    };
  else
    return {
      props: { campaigns, ads },
    };
};
