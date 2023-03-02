export class ErrorFetchingStripePayment extends Error {
  constructor(message: string) {
    super(message);
  }

  static payWithoutPMethod(cause?: string): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment(
      "Error paying without payment method"
    );
  }

  static payWithPMethod(): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error paying with payment method");
  }

  static setupIntent(): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error setting up payment method");
  }

  static noDataProvided(): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment(
      "Error getting data. Data is null or undefined"
    );
  }

  static gettingCreditCard(): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error getting credit card details");
  }

  static removingPM(): ErrorFetchingStripePayment {
    return new ErrorFetchingStripePayment("Error removing payment method");
  }
}
