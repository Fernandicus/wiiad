import { useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { useRouter } from "next/router";
import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import StripePaymentElement from "../../payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../payment/BudgetAndPaymentMethod";
import Image from "next/image";
import { CampaignBudgetSummary } from "./CampaignBudgetSummary";

interface ILaunchCampaign {
  paymentMethods?: ICardDetailsPrimitives[];
  adToLaunch?: AdPropsPrimitives;
  userName: string;
}

export const LaunchCampaignSection = ({
  paymentMethods,
  adToLaunch,
  userName,
}: ILaunchCampaign) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [method, setPaymentMethod] = useState<string>();
  ///const [clientSecret, setClientSecret] = useState<string>();
  const [budget, setBudget] = useState<number>(0);
  const [isSelectCardPage, setSelectCardPage] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isPayingWithPM, setPayingWithPM] = useState<boolean>(false);
  const [isPayingWithNewCard, setPayingWithNewCard] = useState<boolean>(false);
  const router = useRouter();

  const handlePaymentAmount = async (useNewCard = false) => {
    setIsPaying(true);

    if (isPaying) return;
    if (!adToLaunch) return;
    if (budget < 0) return;

    try {
      const stripePayment = new StripePaymentProcess();
      if (useNewCard) {
        const clientSecret = await stripePayment.payUsingNewCard({
          budgetItem: budget,
          adId: adToLaunch.id,
        });
        setIsPaying(false);
        setClientSecret(clientSecret);
        return;
      } else {
        await stripePayment.payWithSelectedCard({
          budgetItem: budget,
          adId: adToLaunch.id,
          paymentMethod: method!,
        });
        setIsPaying(false);
        const splitedPath = window.location.pathname.split("/");
        const path = `/${splitedPath[1]}/campaigns`;
        //  router.push(path);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-3xl space-y-5 p-5">
        <h1 className="text-center font-bold text-gray-600">
          Lanza tu campaña
        </h1>
        <div className="grid grid-cols-4 border border-slate-200 rounded-lg bg-white shadow-xl">
          <div className="col-span-2 p-5 border-r border-slate-100">
            {(!paymentMethods || paymentMethods.length == 0) &&
            clientSecret &&
            !method ? (
              <StripePaymentElement clientSecret={clientSecret} />
            ) : (
              <BudgetAndPaymentMethod
                ad={adToLaunch}
                onContinue={setClientSecret}
                paymentMethods={paymentMethods}
                onSelectedPaymentMethod={setPaymentMethod}
              />
            )}
          </div>
          <CampaignBudgetSummary adToLaunch={adToLaunch!} />
        </div>
      </div>
    </div>
  );
};
