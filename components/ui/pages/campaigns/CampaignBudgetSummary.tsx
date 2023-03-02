import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdSummary } from "./AdSummary";
import { BudgetSummary } from "./BudgetSummary";

export const CampaignBudgetSummary = () => {
  const {
    state: { ad },
  } = usePaymentProcess();
  
  return (
    <div className="col-span-2 p-5 flex flex-col justify-between">
      <AdSummary ad={ad} />
      <BudgetSummary />
    </div>
  );
};
