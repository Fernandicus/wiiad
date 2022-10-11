import { Email } from "@/src/domain/Email";
import { Rol } from "@/src/domain/Rol";
import { ExpirationDate } from "../domain/ExpirationDate";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validateToken(token: string): Promise<VerificationEmailTimer> {
    const verificationToken = new VerificationTokenId(token);
    const validatedEmail = await this.validateEmail.validate(verificationToken);
    return new VerificationEmailTimer({
      id: new VerificationTokenId(validatedEmail.id),
      email: new Email(validatedEmail.email),
      expirationDate: new ExpirationDate(validatedEmail.expirationDate),
      rol: new Rol(validatedEmail.rol),
    });
  }
}
