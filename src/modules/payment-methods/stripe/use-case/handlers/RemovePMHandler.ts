import { UniqId } from "@/src/common/domain/UniqId";
import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { RemovePM } from "../RemovePM";

export class RemovePMHandler {
  constructor(private removePM: RemovePM) {}

  async remove(params: { userId: string; pmId: string }): Promise<void> {
    const id = new UniqId(params.userId);
    const pmId = new PaymentMethodId(params.pmId);

    await this.removePM.remove({
      pm: pmId,
      userId: id,
    });
  }
}
