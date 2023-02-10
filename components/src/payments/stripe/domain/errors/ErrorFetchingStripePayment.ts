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
    return new ErrorFetchingStripePayment("Error paying with payment method", {
      cause,
    });
  }

  static setupIntent(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error setting up payment method", {
      cause,
    });
  }

  static noDataProvided(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment(
      "Error getting data. Data is null or undefined",
      { cause }
    );
  }

  static gettingCreditCard(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error getting credit card details", {
      cause,
    });
  }
}
