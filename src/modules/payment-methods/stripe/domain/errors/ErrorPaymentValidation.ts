export class ErrorPaymentValidation extends Error {
  constructor(message: string) {
    super(message);
  }

  static webhookEvent(message: string) {
    return new ErrorPaymentValidation(`Webhook event error: ${message}`);
  }

  static eventType(eventType: string) {
    return new ErrorPaymentValidation(`Invalid event type: '${eventType}'`);
  }
}
