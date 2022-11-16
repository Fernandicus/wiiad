import { MongoDB } from "@/src/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import {
  findCustomerHandler,
  findPaymentMethodHandler,
  updateStripeHandler,
} from "@/src/modules/payment-methods/stripe/stripe-container";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps } from "next";

export default function Profile() {
  return <h1>Payment complete!!</h1>;
}

//TODO: HACER TESTS

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (!session)
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };

  try {
    const paymentIntent = context.query["payment_intent"];

    const paymentMethod = await findPaymentMethodHandler.fromPaymentIntent(
      paymentIntent as string
    );

    await MongoDB.connectAndDisconnect(async () => {
      const stripeCustomer = await findCustomerHandler.findByUserId(session.id);
      const savedMethod = stripeCustomer.paymentMethods.find(
        (method) => method == paymentMethod
      );
      if (!savedMethod)
        await updateStripeHandler.savePaymentMethod(session.id, paymentMethod);

    });

    return {
      props: {},
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
};
