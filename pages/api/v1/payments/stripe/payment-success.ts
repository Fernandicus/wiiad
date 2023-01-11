//? https://stripe.com/docs/webhooks

import { LaunchCampaignController } from "@/src/modules/campaign/infrastructure/controllers/LaunchCampaignController";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeMetadata";
import {
  findCustomerHandler,
  paymentSucceeded,
  updateStripeHandler,
} from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { reqBodyParse } from "@/src/utils/helpers";

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

export interface IWebHookPaymentSuccess {
  metadata: IStripeMetadata;
  amount: number;
  payment_method: string;
  charges: {
    data: IChargesData[];
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400).end();

  const sig = req.headers["stripe-signature"] as string | Buffer | string[];
  const bufferRequest = await getBufferRequest(req);

  try {
    //TODO => Create PaymentSuccessController and Refactorize
    console.log(": : : :  : ::  ::  : : : : : :");
    console.log(bufferRequest);
    console.log(": : : :  : ::  ::  : : : : : :");
    await MongoDB.connectAndDisconnect(async () => {
      const paymentData = await paymentSucceeded.validateWebhook({
        header: sig,
        payload: bufferRequest,
      });
      await LaunchCampaignController.launch({
        id: UniqId.generate(),
        advertiserId: paymentData.metadata.advertiserId, //session!.id,
        adId: paymentData.metadata.adId,
        budget: paymentData.budget.toPrimitives(),
      });

      const stripeCustomer = await findCustomerHandler.findByUserId(
        paymentData.metadata.advertiserId
      );

      const savedMethod = stripeCustomer.paymentMethods.find(
        (method) =>
          method.paymentMethodId == paymentData.card.paymentMethodId.id
      );

      if (!savedMethod && paymentData.card.paymentMethodId.id) {
        await updateStripeHandler.saveCardDetails(
          paymentData.metadata.advertiserId,
          paymentData.card.toPrimitives()
        );
      }
    });

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error`);
    return;
  }
}

async function getBufferRequest(req: NextApiRequest): Promise<string | Buffer> {
  return process.env.NODE_ENV === "test"
    ? JSON.stringify(req.body)
    : await buffer(req);
}
