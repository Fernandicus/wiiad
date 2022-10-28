import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export default function AdView(props: {
  campaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
}) {
  const { campaign, ad } = props;

  return (
    <div>
      <h1>WATCH CAMPAIGN</h1>
      <ul>
        <li key={campaign.id}>
          <h2>{ad.title}</h2>
          <p>AD ID: {ad.id}</p>
          <p>ADVERTISER ID: {ad.advertiserId}</p>
          <img src={ad.image} width={100} height={100}></img>
          <p>{ad.description}</p>
        </li>
      </ul>
    </div>
  );
}
