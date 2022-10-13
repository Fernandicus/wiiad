import { Email } from "@/src/domain/Email";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";
import { VerificationTokenId } from "../domain/VerificationTokenId";

export class ValidateVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async validate(tokenId: VerificationTokenId, email: Email): Promise<IVerificationEmailTimerPrimitives> {
    const verificationEmail = await this.repository.findById(tokenId.id);
    if (!verificationEmail) throw new ErrorLogIn("Verification Email not found");
    await this.repository.remove(verificationEmail.id);
    await this.checkExpirationDate(verificationEmail);
    if(email.email !== verificationEmail.email) throw new ErrorLogIn("The email provided is not valid");
    return verificationEmail;
  }

  private async checkExpirationDate(
    verificationEmail: IVerificationEmailTimerPrimitives
  ): Promise<void> {
    const emailExpiration = verificationEmail.expirationDate;
    if (this.hasExpired(emailExpiration)) {
      throw new ErrorLogIn("Verification Token has expired");
    }
  }

  private hasExpired(expirationDate: Date): boolean {
    const now = new Date(Date.now()).getTime();
    const emailExpiration = expirationDate.getTime();
    return emailExpiration < now;
  }
}
