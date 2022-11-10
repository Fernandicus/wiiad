import { Email } from "@/src/domain/Email";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorEmailVerification } from "../domain/ErrorEmailVerification";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";

export class ValidateVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async validate(tokenId: string): Promise<VerificationEmailTimer> {
    const verificationEmail = await this.repository.findByAuthToken(tokenId);
   
    if (!verificationEmail)
      throw new ErrorEmailVerification("Verification Email not found");

    await this.repository.removeById(tokenId);
    await this.checkExpirationDate(verificationEmail);

    return verificationEmail;
  }

  private async checkExpirationDate(
    verificationEmail: VerificationEmailTimer
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
