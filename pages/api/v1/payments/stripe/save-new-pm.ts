import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import {
  findCustomerHandler,
  getPaymentDetailsHandler,
  updateStripeHandler,
} from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export interface IApiReqSaveNewPaymentM {
  pmId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad request" });
  const session = userSession.getFromServer({ req, res });

  if (!session)
    return res.status(400).json({ message: "No session provided request" });

  const { pmId } = reqBodyParse(req) as IApiReqSaveNewPaymentM;

  if (!pmId)
    return res.status(400).json({ message: "No payment method provided" });

  try {
    await MongoDB.connectAndDisconnect(async () => {
      const customer = await findCustomerHandler.ByUserId(session.id);
      const pmFound = customer.paymentMethods.find(
        (pm) => pm.paymentMethodId === pmId
      );
      if (pmFound)
        return res
          .status(400)
          .json({ message: "Payment method already exists" });
      const cardDetails = await getPaymentDetailsHandler.fromPaymentMethod(
        pmId
      );
      await updateStripeHandler.saveCardDetails(session.id, cardDetails);
    });
    return res.status(200).json({message:"Payment method saved!"})
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
