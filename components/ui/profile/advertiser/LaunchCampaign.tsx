import StripePaymentElement from "../../payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../payment/BudgetAndPaymentMethod";
import { useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

interface ILaunchCampaign {
  paymentMethods?: string[];
  adToLaunch: AdPropsPrimitives;
}

export const LaunchCampaign = ({
  paymentMethods,
  adToLaunch,
}: ILaunchCampaign) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [method, setPaymentMethod] = useState<string>();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-400/50">
      <div className="w-full p-10 max-w-md border border-slate-200 rounded-lg bg-white shadow-xl">
        {clientSecret && !method ? (
          <StripePaymentElement clientSecret={clientSecret} ad={adToLaunch}/>
        ) : (
          <BudgetAndPaymentMethod
            ad={adToLaunch}
            onContinue={setClientSecret}
            paymentMethods={paymentMethods}
            onSelectedPaymentMethod={setPaymentMethod}
          />
        )}
      </div>
    </div>
  );
};
