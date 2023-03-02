//? https://stripe.com/docs/webhooks

import { LaunchCampaignController } from "@/src/modules/campaign/infrastructure/controllers/LaunchCampaignController";
import { UniqId } from "@/src/utils/UniqId";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeMetadata";
import { StripeCampaignPaymentSuccessController } from "@/src/modules/payment-methods/stripe/infrastructure/controllers/StripeCampaignPaymentSuccessController";
import { projectConfig } from "@/src/utils/projectConfig";

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

  try {
    const sig = getStripeSignature(req);
    const bufferRequest = await getBufferRequest(req);

    await MongoDB.connectAndDisconnect(async () => {
      const controller =
        await StripeCampaignPaymentSuccessController.validateWebhook({
          stripeSig: sig,
          payload: bufferRequest,
        });

      await LaunchCampaignController.launch({
        id: UniqId.generate(),
        ...controller.paymentData.metadata,
        budget: controller.paymentData.budget.toPrimitives(),
      });

      await controller.savePaymentMethod();
    });

    res.status(200).end();
  } catch (err) {
    res.status(400).send(`Webhook Error`);
    return;
  }
}

function getStripeSignature(req: NextApiRequest): string | Buffer | string[] {
  return req.headers["stripe-signature"] as string | Buffer | string[];
}

async function getBufferRequest(req: NextApiRequest): Promise<string | Buffer> {
  return projectConfig.ENV === "test"
    ? JSON.stringify(req.body)
    : await buffer(req);
}
