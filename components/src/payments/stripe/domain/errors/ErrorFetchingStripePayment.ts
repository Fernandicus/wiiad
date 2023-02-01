export class ErrorFetchingStripePayment extends Error {
  constructor(message: string, options: { cause?: string }) {
    super(message, options);
  }

  static payWithoutPMethod(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment(
      "Error paying without payment method",
      { cause }
    );
  }

  static payWithPMethod(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment(
      "Error paying with payment method",
      { cause }
    );
  }
}
