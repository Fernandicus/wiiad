import { Email } from "@/src/domain/Email";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "../domain/AuthToken";
import { ErrorEmailVerification } from "../domain/ErrorEmailVerification";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmail } from "../domain/VerificationEmail";

export class ValidateVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async validate(tokenId: AuthToken): Promise<VerificationEmail> {
    const verificationEmail = await this.repository.findByAuthToken(tokenId);
   
    if (!verificationEmail)
      throw new ErrorEmailVerification("Verification Email not found");

    await this.repository.removeById(verificationEmail.id);
    await this.checkExpirationDate(verificationEmail);

    return verificationEmail;
  }

  private async checkExpirationDate(
    verificationEmail: VerificationEmail
  ): Promise<void> {
    const emailExpiration = verificationEmail.expirationDate.date;
    if (this.hasExpired(emailExpiration)) {
      throw new ErrorEmailVerification("Verification Token has expired");
    }
  }

  private hasExpired(expirationDate: Date): boolean {
    const now = new Date(Date.now()).getTime();
    const emailExpiration = expirationDate.getTime();
    return emailExpiration < now;
  }
}
