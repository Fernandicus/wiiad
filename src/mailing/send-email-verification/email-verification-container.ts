import { EmailVerificationTokenHandler } from "./handler/EmailVerificationTokenHandler";
import { SendVerificationEmailHandler } from "./handler/SendVerificationEmailHandler";
import { ValidateEmailHandler } from "./handler/ValidateEmailHandler";
import { NodemailerSendVerificationEmail } from "./infrastructure/NodemailerSendVerificationEmail";
import { VerificationEmailMongoDBRepo } from "./infrastructure/VerificationEmailMongoDBRepo";
import { SaveEmailVerification } from "./use-case/SaveEmailVerification";
import { SendlVerificationEmail } from "./use-case/SendVerificationEmail";
import { ValidateVerificationEmail } from "./use-case/ValidateVerificationEmail";

const verificationEmailRepo = new VerificationEmailMongoDBRepo();
const saveEmailVerification = new SaveEmailVerification(verificationEmailRepo);
export const verificationEmailHandler = new EmailVerificationTokenHandler(
  saveEmailVerification
);

const nodemailerSender = new NodemailerSendVerificationEmail();
const sendEmail = new SendlVerificationEmail(nodemailerSender);
export const sendEmailHandler = new SendVerificationEmailHandler(sendEmail);


const validateEmail = new ValidateVerificationEmail(verificationEmailRepo);
export const validateEmailHandler = new ValidateEmailHandler(validateEmail);
