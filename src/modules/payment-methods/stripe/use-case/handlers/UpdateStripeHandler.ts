import { UniqId } from "@/src/common/domain/UniqId";
import { CardDetails, ICardDetailsPrimitives } from "../../domain/CardDetails";
import { CardBrand } from "../../domain/value-objects/CardBrand";
import { ExpMonth } from "../../domain/value-objects/ExpMonth";
import { ExpYear } from "../../domain/value-objects/ExpYear";
import { Last4 } from "../../domain/value-objects/Last4";
import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { UpdateStripe } from "../UpdateStripe";

export class UpdateStripeHandler {
  constructor(private updateStripe: UpdateStripe) {}

  async saveCardDetails(
    userId: string,
    cardDetails: ICardDetailsPrimitives
  ): Promise<void> {
    const id = new UniqId(userId);
    const details = new CardDetails({
      paymentMethodId: new PaymentMethodId(cardDetails.paymentMethodId),
      brand: new CardBrand(cardDetails.brand),
      expMonth: new ExpMonth(cardDetails.expMonth),
      expYear: new ExpYear(cardDetails.expYear),
      last4: new Last4(cardDetails.last4),
    });

    await this.updateStripe.saveCardDetails({
      userId: id,
      cardDetails: details,
    });
  }
}
