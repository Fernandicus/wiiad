//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import StripePayment from "@/pages/payment";
import { StripePaymentController } from "@/src/controllers/StripePaymentController";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/PaymentAmount";
import { IPaymentDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/PaymentIntentId";
import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { userSession } from "@/src/use-case/container";
import { UniqId } from "@/src/utils/UniqId";
import { reqBodyParse } from "@/src/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

interface IApiPaymentIntent {
  paymentMethod: string;
  budgetItem: number;
  adId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") res.status(400).end();

  const session = userSession.getFromServer({ req, res });
  if (!session) res.status(400).end();

  const { paymentMethod, budgetItem, adId }: IApiPaymentIntent =
    reqBodyParse(req);

  console.log({ paymentMethod, budgetItem, adId });

  try {
    const amount = PaymentAmount.fromItem(budgetItem);

    if (!amount.isValidAmount())
      throw new Error("La cantidad a pagar no es valida");

    if (!paymentMethod) {
      const paymentDetails = await MongoDB.connectAndDisconnect(async () => {
        const details =
          await StripePaymentController.paymentWithoutPaymentMethod({
            userId: session!.id,
            amount: amount.amount,
            metadata: { adId, advertiserId: session!.id },
          });
        return details;
      });

      res.status(200).send({ clientSecret: paymentDetails.clientSecret });
    } else {
      await MongoDB.connectAndDisconnect(async () => {
        const paymentDetails =
          await StripePaymentController.paymentWithPaymentMethod({
            userId: session!.id,
            paymentMethodId: paymentMethod,
            amount: amount.amount,
            metadata: { adId, advertiserId: session!.id },
          });
        return paymentDetails;
      });
      res.status(200).end();
    }
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
}
