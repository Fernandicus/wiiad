export class ErrorGettingPaymentDetails extends Error {
  constructor(message: string) {
    super(message);
  }

  static fromPaymentIntent(id: string): ErrorGettingPaymentDetails {
    return new ErrorGettingPaymentDetails(`Payment intent ${id} not found`);
  }

  static fromPaymentMethod(id: string): ErrorGettingPaymentDetails {
    return new ErrorGettingPaymentDetails(`Payment method ${id} not found`);
  }
}
