import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";

export class ValidateVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async validate(token: string): Promise<IVerificationEmailTimerPrimitives> {
    const verificationEmail = await this.repository.findById(token);
    if (!verificationEmail) throw new ErrorLogIn("Verification Email not found");
    await this.checkExpirationDate(verificationEmail);
    return verificationEmail;
  }

  private async checkExpirationDate(
    verificationEmail: IVerificationEmailTimerPrimitives
  ): Promise<void> {
    const emailExpiration = verificationEmail.expirationDate;
    await this.repository.remove(verificationEmail.id);
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