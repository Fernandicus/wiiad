import {
  IValidatedPaymentData,
  StripePayments,
} from "../infrastructure/StripePayments";

export class PaymentSucceeded {
  constructor(private readonly stripePayments: StripePayments) {}

  async validateWebhook(params: {
    payload: string | Buffer;
    header: string | Buffer | string[];
  }): Promise<IValidatedPaymentData> {
    const response = await this.stripePayments.validateWebhookEvent(params);
    return response;
  }
}
