import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { Notification } from "../../notifications/Notification";
import AdView from "./AdView";

type AdViewPage = Parameters<typeof AdView>[0];

export const AdViewPage = ({ ad, campaign, referrer, user }: AdViewPage) => {
  return (
    <>
      <AdView
        user={user}
        campaign={campaign as ICampaignPrimitives}
        ad={ad as AdPropsPrimitives}
        referrer={referrer!}
      />
      <div className="fixed top-5 right-5">
        <Notification />
      </div>
    </>
  );
};
