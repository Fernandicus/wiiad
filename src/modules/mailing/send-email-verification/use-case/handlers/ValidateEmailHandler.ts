import { AuthToken } from "../../domain/value-objects/AuthToken";
import { IVerificationEmailPrimitives } from "../../domain/VerificationEmail";
import { ValidateVerificationEmail } from "../ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validate(authToken: string): Promise<IVerificationEmailPrimitives> {
    const token = new AuthToken(authToken);
    const validatedEmail = await this.validateEmail.validate(token);
    return validatedEmail.toPrimitives();
  }
}
