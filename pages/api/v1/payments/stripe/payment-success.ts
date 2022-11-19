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
  let object: { metadata: IStripeMetadata; amount: number };

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    object = event.data.object as { metadata: IStripeMetadata; amount: number };
  } catch (err) {
    res.status(400).send(`Webhook Error`);
    return;
  }

  const amount = new PaymentAmount(object.amount);
  const budget = CampaignBudget.fromAmount(amount);

  //TODO: CHECK IF PAYMENT IS NEW PAYMENT METHOD
  //* check if saved
  //* if not, save it

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
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).end();
  } catch (err) {
    res.status(400).send(`Webhook Error`);
    return;
  }
}
