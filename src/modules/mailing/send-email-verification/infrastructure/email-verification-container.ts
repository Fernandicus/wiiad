import { SendVerificationEmailHandler } from "../use-case/handlers/SendVerificationEmailHandler";
import { NodemailerSendVerificationEmail } from "./NodemailerSendVerificationEmail";
import { SendlVerificationEmail } from "../use-case/SendVerificationEmail";
import { JsonWebTokenNPM } from "@/src/common/infrastructure/JsonWebTokenNPM";
import { SendVerificationEmailController } from "./controllers/SendVerificationEmailController";
import { CreateAuthTokenHandler } from "../use-case/handlers/CreateAuthTokenHandler";
import { CreateAuthToken } from "../use-case/CreateAuthToken";
import { AuthTokenRepo } from "./AuthTokenRepo";

const nodemailerSender = new NodemailerSendVerificationEmail();
const sendEmail = new SendlVerificationEmail(nodemailerSender);

export const sendVerificationEmailHandler = new SendVerificationEmailHandler(
  sendEmail
);

export const verificationEmailController =
  new SendVerificationEmailController();

const authTokenRepo = new AuthTokenRepo();
const authTokenCreator = new CreateAuthToken(authTokenRepo);
export const createAuthTokenHandler = new CreateAuthTokenHandler(
  authTokenCreator
);
