import { EmailVerificationTokenHandler } from "./handler/EmailVerificationTokenHandler";
import { JWTHandler } from "./handler/JWTHandler";
import { RemoveVerificationEmailHandler } from "./handler/RemoveVerificationEmailHandler";
import { SendVerificationEmailHandler } from "./handler/SendVerificationEmailHandler";
import { ValidateEmailHandler } from "./handler/ValidateEmailHandler";
import { JsonWebTokenNPM } from "./infrastructure/JsonWebTokenNPM";
import { NodemailerSendVerificationEmail } from "./infrastructure/NodemailerSendVerificationEmail";
import { VerificationEmailMongoDBRepo } from "./infrastructure/VerificationEmailMongoDBRepo";
import { ManageJWT } from "./use-case/ManageJWT";
import { RemoveVerificationEmail } from "./use-case/RemoveVerificationEmail";
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


const jwtRepo = new JsonWebTokenNPM();
const manageJWT = new ManageJWT(jwtRepo);
export const jwtHandler = new JWTHandler(manageJWT);


const removeVerificationEmail = new RemoveVerificationEmail(verificationEmailRepo);
export const removeVerificationEmailHandler = new RemoveVerificationEmailHandler(removeVerificationEmail);
