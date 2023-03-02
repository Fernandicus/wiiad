import { Email } from "@/src/common/domain/Email";
import {
  ISetupIntentPrimitives,
  SetupIntentHandler,
} from "../../use-case/handlers/SetupIntentHandler";
import { SetupIntent } from "../../use-case/SetupIntent";
import {
  createStripeCustomerHandler,
  findCustomerHandler,
  setupIntentHandler,
} from "../stripe-container";

export class StripeSetupIntentController {
  constructor() {}

  async create(userId:string): Promise<ISetupIntentPrimitives> {
    try {
      const stripeCustomer = await findCustomerHandler.ByUserId(userId);
      return await setupIntentHandler.create(stripeCustomer.customerId);
    } catch (err) {
      const customerId = await createStripeCustomerHandler.create();
      return await setupIntentHandler.create(customerId);
    }
  }
}
