import { VerificationTokenConstants } from "../verification-token-constants";
import { ErrorVerificationToken } from "./ErrorVerificationToken";

export class ExpirationDate {
  readonly date;

  constructor(date: Date) {
    const minimumExpirationDate = new Date(
      Date.now() + VerificationTokenConstants.oneMinute * 3
    );

    const maximumExpirationDate = new Date(
      Date.now() + VerificationTokenConstants.twentyFourH
    );

    if (date < minimumExpirationDate) {
      throw new ErrorVerificationToken(
        "Minimum expiration date should be in 3 min"
      );
    } else if (date > maximumExpirationDate) {
      throw new ErrorVerificationToken(
        "Maximum expiration date should be in 24 h"
      );
    }

    this.date = date;
  }

  static inFiveMinutes(): ExpirationDate {
    return new ExpirationDate(
      new Date(Date.now() + VerificationTokenConstants.fiveMin)
    );
  }
}
