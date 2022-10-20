import { UniqId } from "@/src/utils/UniqId";
import { ISendVerificationEmail } from "../domain/ISendVerificationEmail";
import {
  sendEmailHandler,
  verificationEmailHandler,
} from "../email-verification-container";

export class SendVerificationEmailController {
  static async send(data: ISendVerificationEmail): Promise<void> {
    const id = UniqId.generate();

    await verificationEmailHandler.saveWithExpirationIn5min({
      email: data.email,
      id,
      rol: data.rol,
    });

    await sendEmailHandler.send({
      id,
      email: data.email,
      userName: data.userName,
    });
  }
}