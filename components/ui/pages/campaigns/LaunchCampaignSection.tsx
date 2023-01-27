import { useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { useRouter } from "next/router";
import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import StripePaymentElement from "../../payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../payment/BudgetAndPaymentMethod";
import Image from "next/image";
import { CampaignBudgetSummary } from "./CampaignBudgetSummary";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

interface ILaunchCampaign {
  adToLaunch?: AdPropsPrimitives;
}

export const LaunchCampaignSection = ({ adToLaunch }: ILaunchCampaign) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [pricePCIndex, setPricePCIndex] = useState(0);

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
              <BudgetAndPaymentMethod
                pricePC={pricePCIndex}
                setPricePC={(params) => setPricePCIndex(params)}
                ad={adToLaunch}
                onContinue={setClientSecret}
              />
            )}
          </div>
          <CampaignBudgetSummary
            pricePC={pricePCIndex}
            adToLaunch={adToLaunch!}
          />
        </div>
      </div>
    </div>
  );
};
