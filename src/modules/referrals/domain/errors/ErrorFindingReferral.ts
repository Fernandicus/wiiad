export class ErrorFindingReferral extends Error {
  constructor(message: string) {
    super(message);
  }

  static byUserId(id: string): ErrorFindingReferral {
    return new ErrorFindingReferral(`Referral with user id ${id} not found`);
  }
}
