import { ErrorRemovingPaymentMethod } from "../../domain/errors/ErrorRemovingPaymentMethod";
import {
  detachStripePmHandler,
  findCustomerHandler,
  removePMHandler,
} from "../stripe-container";

export class StripeRemovePMController {
  async removePM(params: { userId: string; pmId: string }): Promise<void> {
    try {
      await detachStripePmHandler.detach(params.pmId);
      await removePMHandler.remove({
        pmId: params.pmId,
        userId: params.userId,
      });
    } catch (err) {
      if (err instanceof Error)
        throw new ErrorRemovingPaymentMethod(err.message);
    }
  }
}
