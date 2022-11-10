import { Email } from "@/src/domain/Email";
import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "../domain/AuthToken";
import { IVerificationEmailPrimitives } from "../domain/VerificationEmail";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validate(authToken: string): Promise<IVerificationEmailPrimitives> {
    const token = new AuthToken(authToken);
    const validatedEmail = await this.validateEmail.validate(token);
    return validatedEmail.toPrimitives();
  }
}
