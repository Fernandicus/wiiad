import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export default function AdView(props: { campaigns: ICampaignPrimitives[] }) {
  return (
    <div>
      <h1>NO SESSION or NOT YOUR PROFILE</h1>
      <ul>
        {!props.campaigns ? (
          <p>This advertiser has no ads</p>
        ) : (
          props.campaigns.map((campaign) => {
            return (
              <li key={campaign.id}>
                <p>AD ID: {campaign.adId}</p>
                <p>ADVERTISER ID: {campaign.advertiserId}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
