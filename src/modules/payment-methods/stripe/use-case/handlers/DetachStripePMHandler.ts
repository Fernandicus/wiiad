import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { DetachStripePM } from "../DetachStripePM";

export class DetachStripePMHandler {
  constructor(private removePM: DetachStripePM) {}

  async detach(paymentMethodId: string): Promise<void> {
    const pmId = new PaymentMethodId(paymentMethodId);
    await this.removePM.detach(pmId);
  }
}
