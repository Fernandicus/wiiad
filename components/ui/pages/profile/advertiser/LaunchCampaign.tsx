import StripePaymentElement from "../../../payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../../payment/BudgetAndPaymentMethod";
import { useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { StripePaymentProcess } from "../../../../src/payments/StripePaymentProcess";
import { useRouter } from "next/router";

interface ILaunchCampaign {
  paymentMethods?: ICardDetailsPrimitives[];
  adToLaunch: AdPropsPrimitives;
  userName: string;
}

export const LaunchCampaign = ({
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
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-400/50">
      <div className="w-full p-5 max-w-sm border border-slate-200 rounded-lg bg-white shadow-xl">
        {(!paymentMethods || paymentMethods.length == 0) && clientSecret && !method ? (
          <StripePaymentElement clientSecret={clientSecret}/>
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
