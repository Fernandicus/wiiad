import { EmailVerificationTokenHandler } from "../use-case/handlers/EmailVerificationTokenHandler";
import { RemoveVerificationEmailHandler } from "../use-case/handlers/RemoveVerificationEmailHandler";
import { SendVerificationEmailHandler } from "../use-case/handlers/SendVerificationEmailHandler";
import { ValidateEmailHandler } from "../use-case/handlers/ValidateEmailHandler";
import { AuthTokenCrypto } from "./AuthTokenCrypto";
import { NodemailerSendVerificationEmail } from "./NodemailerSendVerificationEmail";
import { VerificationEmailMongoDBRepo } from "./db/VerificationEmailMongoDBRepo";
import { CreateAuthToken } from "../use-case/CreateAuthToken";
import { RemoveVerificationEmail } from "../use-case/RemoveVerificationEmail";
import { SaveVerificationEmail } from "../use-case/SaveVerificationEmail";
import { SendlVerificationEmail } from "../use-case/SendVerificationEmail";
import { ValidateVerificationEmail } from "../use-case/ValidateVerificationEmail";

const verificationEmailRepo = new VerificationEmailMongoDBRepo();
const saveVerificationEmail = new SaveVerificationEmail(verificationEmailRepo);
export const verificationEmailHandler = new EmailVerificationTokenHandler(
  saveVerificationEmail
);

const nodemailerSender = new NodemailerSendVerificationEmail();
const authTokenRepo = new AuthTokenCrypto();
export const authTokenCreator = new CreateAuthToken(authTokenRepo);
const sendEmail = new SendlVerificationEmail(nodemailerSender);

export const sendEmailHandler = new SendVerificationEmailHandler(sendEmail);

const validateEmail = new ValidateVerificationEmail(verificationEmailRepo);
export const validateEmailHandler = new ValidateEmailHandler(validateEmail);

const removeVerificationEmail = new RemoveVerificationEmail(
  verificationEmailRepo
);
export const removeVerificationEmailHandler =
  new RemoveVerificationEmailHandler(removeVerificationEmail);
