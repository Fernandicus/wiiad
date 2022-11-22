//? https://stripe.com/docs/webhooks

import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import { userSession } from "@/src/use-case/container";
import { UniqId } from "@/src/utils/UniqId";
import { reqBodyParse } from "@/src/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/PaymentAmount";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/IStripeMetadata";
import {
  findCustomerHandler,
  getPaymentDetailsHandler,
  updateStripeHandler,
} from "@/src/modules/payment-methods/stripe/stripe-container";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";

interface IChargesData {
  payment_method_details: {
    card: {
      brand: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      last4: string;
    };
  };
}

interface IWebHookPaymentSuccess {
  metadata: IStripeMetadata;
  amount: number;
  payment_method: string;
  charges: {
    data: IChargesData[];
  };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") res.status(400).end();

  const sig = req.headers["stripe-signature"] as string | Buffer | string[];
  const webhookSecret = process.env.STRIPE_SUCCESS_WEBHOOK_SECRET!;
  const body = await buffer(req);

  let event: Stripe.Event;
  let object: IWebHookPaymentSuccess;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    object = event.data.object as IWebHookPaymentSuccess;
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook EVENT Error`);
    return;
  }

  /* if (!object.amount) throw new Error("There is no payment amount found");
  if (!object.metadata.adId || !object.metadata.adId)
    throw new Error("No metadata added to the Payment Intent Confirmation:"); */

  const amount = new PaymentAmount(object.amount);
  const budget = CampaignBudget.fromAmount(amount);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await MongoDB.connectAndDisconnect(async () => {
          await LaunchCampaignController.launch({
            id: UniqId.generate(),
            advertiserId: object.metadata.advertiserId, //session!.id,
            adId: object.metadata.adId,
            budget: budget.toPrimitives(),
          });

          const stripeCustomer = await findCustomerHandler.findByUserId(
            object.metadata.advertiserId
          );

          const savedMethod = stripeCustomer.paymentMethods.find(
            (method) => method.paymentMethodId == object.payment_method
          );

          console.log("SUCCESS: SAVED METHOD ", savedMethod);

          if (!savedMethod && object.payment_method) {
            const card = object.charges.data[0].payment_method_details.card;
            const paymentDetails: ICardDetailsPrimitives = {
              paymentMethodId: object.payment_method,
              brand: card.brand,
              expMonth: card.exp_month,
              expYear: card.exp_year,
              last4: card.last4,
            };

            await updateStripeHandler.saveCardDetails(
              object.metadata.advertiserId,
              paymentDetails
            );
          }
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error`);
    return;
  }
}
