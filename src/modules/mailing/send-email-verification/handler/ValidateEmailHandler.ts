import { Email } from "@/src/domain/Email";
import { UniqId } from "@/src/utils/UniqId";
import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validate(
    token: string,
    email: string
  ): Promise<IVerificationEmailTimerPrimitives> {
    const verificationToken = new UniqId(token);
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
