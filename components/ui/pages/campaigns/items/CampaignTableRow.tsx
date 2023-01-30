import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

interface ICampaignTableRow {
  campaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
}

export const CampaignTableRow = ({ campaign, ad }: ICampaignTableRow) => {
  const calculateCPV = (totalClicks: number, balance: number) => {
    return totalClicks === 0 ? 0 : balance / 100 / totalClicks;
  };
  const calculateCPR = (totalRedirections: number, balance: number) => {
    return totalRedirections === 0 ? 0 : balance / 100 / totalRedirections;
  };

  return (
    <tr className="text-center even:bg-sky-50">
      <td scope="row" className="p-5 text-left">
        {ad.title}
      </td>
      <td className="p-5">{campaign.budget.balance / 100}€</td>
      <td className="p-5">{campaign.budget.clicks}</td>
      <td className="p-5">{campaign.metrics.totalViews}</td>
      <td className="p-5">{campaign.metrics.totalClicks}</td>
      <td className="p-5">
        {calculateCPV(campaign.metrics.totalViews, campaign.budget.balance)}
      </td>
      <td className="p-5">
        {calculateCPR(campaign.metrics.totalClicks, campaign.budget.balance)}
      </td>
      <td className="px-3">
        <button className="bg-red-100 hover:bg-red-500 hover:text-white text-red-600 px-2 py-1 text-sm rounded-md">
          Detener
        </button>
      </td>
    </tr>
  );
};
