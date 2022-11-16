//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment

import { StripePaymentController } from "@/src/controllers/StripePaymentController";
import { Balance } from "@/src/domain/Balance";
import { ErrorCreatingPayment } from "@/src/domain/ErrorCreatingPayment";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { LaunchCampaignController } from "@/src/modules/campaign/controller/LaunchCampaignController";
import {
  CampaignBudget,
  CampaignBudgetProps,
} from "@/src/modules/campaign/domain/value-objects/Budget";
import { userSession } from "@/src/use-case/container";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
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

  let budget: CampaignBudget;

  switch (budgetItem) {
    case 0:
      budget = new CampaignBudget({
        balance: new Balance(5000),
        clicks: 1000,
      });
      break;
    case 1:
      budget = new CampaignBudget({
        balance: new Balance(7000),
        clicks: 2000,
      });
      break;
    case 2:
      budget = new CampaignBudget({
        balance: new Balance(10000),
        clicks: 5000,
      });
      break;
    default:
      throw new ErrorCreatingPayment("No budget item provided");
  }

  try {
    const clientSecret = await MongoDB.connectAndDisconnect(async () => {
      let clientSecret;
      if (!paymentMethod) {
        clientSecret =
          await StripePaymentController.paymentWithoutPaymentMethod({
            userId: session!.id,
            amount: budget.balance.total,
          });
      } else {
        clientSecret = await StripePaymentController.paymentWithPaymentMethod({
          userId: session!.id,
          amount: budget.balance.total,
          paymentMethodId: paymentMethod,
        });
      }
      await LaunchCampaignController.launch({
        id: UniqId.generate(),
        adId,
        advertiserId: session!.id,
        budget,
      });
      return clientSecret;
    });

    res.status(200).send({ clientSecret });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
}
