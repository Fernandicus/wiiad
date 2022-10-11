import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validateToken(
    token: string
  ): Promise<IVerificationEmailTimerPrimitives> {
    const verificationToken = new VerificationTokenId(token);
    const validatedEmail = await this.validateEmail.validate(verificationToken);
    return {
      id: validatedEmail.id,
      email: validatedEmail.email,
      expirationDate: validatedEmail.expirationDate,
      rol: validatedEmail.rol,
    };
  }
}
