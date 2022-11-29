export class ErrorPaymentIntent extends Error {
  constructor(message: string) {
    super(message);
  }

  static fail(): ErrorPaymentIntent {
    return new ErrorPaymentIntent("Payment intent has failed");
  }

  static confirmationFail(): ErrorPaymentIntent {
    return new ErrorPaymentIntent("Payment confirmation error");
  }
}
