import { Email } from "@/src/domain/Email";
import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validate(
    token: string,
    email: string
  ): Promise<IVerificationEmailTimerPrimitives> {
    const verificationToken = new VerificationTokenId(token);
    const verificationEmail = new Email(email);
    const validatedEmail = await this.validateEmail.validate(verificationToken, verificationEmail);
    return {
      id: validatedEmail.id,
      email: validatedEmail.email,
      expirationDate: validatedEmail.expirationDate,
      rol: validatedEmail.rol,
    };
  }
}
