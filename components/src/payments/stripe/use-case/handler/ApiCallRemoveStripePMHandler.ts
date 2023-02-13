import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { ApiCallRemovePM } from "../ApiCallRemoveStripePM";

export class ApiCallRemoveStripePMHandler {
  constructor(private removePM: ApiCallRemovePM) {}

  async remove(pmId: string): Promise<void> {
    const id = new PaymentMethodId(pmId);
    await this.removePM.remove(id);
  }
}
