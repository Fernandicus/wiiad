import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/CustomerId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { StripeMongoDBRepo } from "@/src/modules/payment-methods/stripe/infrastructure/StripeMongoDBRepo";
import { saveCustomerHandler } from "@/src/modules/payment-methods/stripe/stripe-container";
import { SaveStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/SaveStripeCustomer";
import { userSession } from "@/src/use-case/container";
import { UniqId } from "@/src/utils/UniqId";
import { reqBodyParse } from "@/src/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") res.status(400).end();

  const session = userSession.getFromServer({ req, res });
  if (!session) res.status(400).end();

  try {
    const {customer}: {customer:string} = reqBodyParse(req);

    await saveCustomerHandler.save({
      id: UniqId.generate(),
      userId: session!.id,
      customerId: customer,
    });
    
    res.status(200);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .end({ message: "Something went wrong saving StripeCustomer" });
  }
}
