import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { UniqId } from "@/src/common/domain/UniqId";
import { IClientSecret } from "../../domain/interfaces/StripeApiCalls";
import { PayWithStripe } from "../PayWithStripe";

interface IWithoutPM {
  adId: string;
  budgetItem: number;
}

interface IWithPMethod extends IWithoutPM {
  paymentMethod: string;
}

export class PayWithStripeHandler {
  constructor(private stripe: PayWithStripe) {}

  async withPMethod(params: IWithPMethod): Promise<void> {
    const { adId, budgetItem, paymentMethod } = params;
    const id = new UniqId(adId);
    const budget = new PricesPerClick(budgetItem);
    const pmethod = new PaymentMethodId(paymentMethod);
    await this.stripe.withPaymentMethod({
      adId: id,
      budgetItem: budget,
      paymentMethod: pmethod,
    });
  }

  async withoutPMethod(params: IWithoutPM): Promise<IClientSecret> {
    const { adId, budgetItem } = params;
    const id = new UniqId(adId);
    const budget = new PricesPerClick(budgetItem);
    return await this.stripe.withoutPaymentMethod({
      adId: id,
      budgetItem: budget,
    });
  }
}
