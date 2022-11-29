export class ErrorFindingStripe extends Error {
  constructor(message: string) {
    super(message);
  }

  static byUserId(id: string): ErrorFindingStripe {
    return new ErrorFindingStripe(
      `Stripe user id account '${id}' was not found`
    );
  }
}
