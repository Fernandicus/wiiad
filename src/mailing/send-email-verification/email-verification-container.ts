import { EmailVerificationTokenHandler } from "./handler/EmailVerificationTokenHandler";
import { SendVerificationEmailHandler } from "./handler/SendVerificationEmailHandler";
import { NodemailerSendVerificationEmail } from "./infrastructure/NodemailerSendVerificationEmail";
import { VerificationEmailMongoDBRepo } from "./infrastructure/VerificationEmailMongoDBRepo";
import { SaveEmailVerification } from "./use-case/SaveEmailVerification";
import { SendlVerificationEmail } from "./use-case/SendVerificationEmail";

const verificationEmailRepo = new VerificationEmailMongoDBRepo();
const saveEmailVerification = new SaveEmailVerification(verificationEmailRepo);
export const verificationEmailHandler = new EmailVerificationTokenHandler(
  saveEmailVerification
);

/* await verificationTokenHandler.saveWithExpirationIn5min({
  email: reqBody.email,
  id,
  rol: reqBody.rol,
}); */

const nodemailerSender = new NodemailerSendVerificationEmail();
const sendEmail = new SendlVerificationEmail(nodemailerSender);
export const sendEmailHandler = new SendVerificationEmailHandler(sendEmail);
/* 
await sendEmailHandler.send({
  id,
  email: reqBody.email,
  userName: reqBody.userName,
}); */

