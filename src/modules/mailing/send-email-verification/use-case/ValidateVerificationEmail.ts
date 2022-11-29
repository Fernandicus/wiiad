import { AuthToken } from "../domain/value-objects/AuthToken";
import { ErrorVerificationEmail } from "../domain/errors/ErrorVerificationEmail";
import { IVerificationEmailRepo } from "../domain/interfaces/IVerificationEmailRepo";
import { VerificationEmail } from "../domain/VerificationEmail";

export class ValidateVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async validate(tokenId: AuthToken): Promise<VerificationEmail> {
    const verificationEmail = await this.repository.findByAuthToken(tokenId);

    if (!verificationEmail)
      throw ErrorVerificationEmail.authTokenNotFound(tokenId.token);

    await this.repository.removeById(verificationEmail.id);
    await this.checkExpirationDate(verificationEmail);

    return verificationEmail;
  }

  private async checkExpirationDate(
    verificationEmail: VerificationEmail
  ): Promise<void> {
    const emailExpiration = verificationEmail.expirationDate.date;
    if (this.hasExpired(emailExpiration)) {
      throw ErrorVerificationEmail.expiredToken();
    }
  }

  private hasExpired(expirationDate: Date): boolean {
    const now = new Date(Date.now()).getTime();
    const emailExpiration = expirationDate.getTime();
    return emailExpiration < now;
  }
}
