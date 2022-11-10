import { Email } from "@/src/domain/Email";
import { UniqId } from "@/src/utils/UniqId";
import { IVerificationEmailTimerPrimitives } from "../domain/VerificationEmailTimer";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

export class ValidateEmailHandler {
  constructor(private validateEmail: ValidateVerificationEmail) {}

  async validate(token: string): Promise<IVerificationEmailTimerPrimitives> {
    const validatedEmail = await this.validateEmail.validate(token);
    return validatedEmail.toPrimitives();
  }
}
