export class ErrorVerificationEmail extends Error {
  constructor(message: string) {
    super(message);
  }

  static authTokenNotFound(token:string): ErrorVerificationEmail {
    return new ErrorVerificationEmail(`The Auth token ${token} was not found`);
  }

  static expiredToken(): ErrorVerificationEmail {
    return new ErrorVerificationEmail(`The Auth token has expired`);
  }
}
