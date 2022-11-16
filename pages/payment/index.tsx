import { MongoDB } from "@/src/infrastructure/MongoDB";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/stripe-container";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps } from "next";
import { useState } from "react";
import StripePaymentElement from "../../components/ui/payment/StripePaymentElement";
import { BudgetAndPaymentMethod } from "../../components/ui/payment/BudgetAndPaymentMethod";

export default function StripePayment(params: { paymentMethods: string[] }) {
  const [clientSecret, setClientSecret] = useState<string>();
  const [method, setPaymentMethod] = useState<string>();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
      <div className="w-full p-10 max-w-md border border-slate-200 rounded-lg bg-white shadow-xl shadow-slate-200">
        {clientSecret && !method ? (
          <StripePaymentElement clientSecret={clientSecret} />
        ) : (
          <BudgetAndPaymentMethod
            onContinue={setClientSecret}
            paymentMethods={params.paymentMethods}
            onSelectedPaymentMethod={setPaymentMethod}
          />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (!session)
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };

  const stripeCustomer = await MongoDB.connectAndDisconnect(
    async () => await findCustomerHandler.findByUserId(session.id)
  );

  if (stripeCustomer.paymentMethods.length !== 0)
    return {
      props: {
        paymentMethods: stripeCustomer.paymentMethods,
      },
    };
  else
    return {
      props: {},
    };
};
