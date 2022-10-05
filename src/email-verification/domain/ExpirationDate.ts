import { VerificationTokenConstants } from "../verification-token-constants";
import { ErrorEmailVerification } from "./ErrorEmailVerification";

export class ExpirationDate {
  readonly date: Date;

  constructor(date: Date) {
    this.dateIsCorret(date);
    this.date = date;
  }

  static inFiveMinutes(): ExpirationDate {
    return new ExpirationDate(
      new Date(Date.now() + VerificationTokenConstants.fiveMin)
    );
  }

  private dateIsCorret(date: Date): void {
    const minimumExpirationDate = new Date(
      Date.now() + VerificationTokenConstants.oneMinute * 3
    );

    const maximumExpirationDate = new Date(
      Date.now() + VerificationTokenConstants.twentyFourH
    );
    if (date < minimumExpirationDate) {
      throw new ErrorEmailVerification(
        "Minimum expiration date should be in 3 min"
      );
    } else if (date > maximumExpirationDate) {
      throw new ErrorEmailVerification(
        "Maximum expiration date should be in 24 h"
      );
    }
  }
}
