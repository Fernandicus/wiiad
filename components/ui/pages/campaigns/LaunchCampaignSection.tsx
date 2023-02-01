import { useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import StripePaymentElement from "../../payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../payment/BudgetAndPaymentMethod";
import { CampaignBudgetSummary } from "./CampaignBudgetSummary";
import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";

export const LaunchCampaignSection = () => {
  const [clientSecret, setClientSecret] = useState<string>();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-3xl space-y-5 p-5">
        <h1 className="text-center font-bold text-gray-600">
          Calcula tu presupuesto
        </h1>
        <div className="grid grid-cols-4 border border-slate-200 rounded-lg bg-white shadow-xl">
          <div className="col-span-2 p-5 border-r border-slate-100">
            {clientSecret ? (
              <StripePaymentElement clientSecret={clientSecret} />
            ) : (
              <BudgetAndPaymentMethod onContinue={setClientSecret} />
            )}
          </div>
          <CampaignBudgetSummary />
        </div>
      </div>
    </div>
  );
};
