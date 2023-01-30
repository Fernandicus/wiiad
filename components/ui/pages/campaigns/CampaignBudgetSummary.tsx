import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdSummary } from "./AdSummary";
import { BudgetSummary } from "./BudgetSummary";

export const CampaignBudgetSummary = (props: {
  adToLaunch: AdPropsPrimitives;
}) => {
  const { adToLaunch } = props;
  return (
    <div className="col-span-2 p-5 flex flex-col justify-between">
      <AdSummary ad={adToLaunch} />
      <BudgetSummary />
    </div>
  );
};
