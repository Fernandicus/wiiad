import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { UniqId } from "@/src/utils/UniqId";
import { SaveEmailVerificationToken } from "@/src/email-verification/use-case/SaveEmailVerificationToken";
import { EmailVerificationTokenHandler } from "@/src/email-verification/handler/EmailVerificationTokenHandler";
import { NodemailerSendVerificationEmail } from "@/src/email-verification/infrastructure/NodemailerSendVerificationEmail";
import { Name } from "@/src/domain/Name";
import { Email } from "@/src/domain/Email";
import { VerificationTokenId } from "@/src/email-verification/domain/VerificationTokenId";
import { SendEmailVerification } from "@/src/email-verification/use-case/SendVerificationEmail";
import { VerificationEmail } from "@/src/email-verification/domain/VerificationEmail";
import { SendVerificationEmailHandler } from "@/src/email-verification/handler/SendVerificationEmailHandler";
import { ErrorEmailVerification } from "@/src/email-verification/domain/ErrorEmailVerification";
import { ErrorSendingEmail } from "@/src/email-verification/domain/ErrorSendingEmail";

export interface ISendVerificationEmailBodyRequest {
  email: string;
  userName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: ISendVerificationEmailBodyRequest = req.body; //JSON.parse(req.body);

  if (reqBody.email == undefined || reqBody.userName == undefined)
    return res.status(400).json({});

  try {
    const id = UniqId.generate();

    const verificationTokenRepo = await MongoDB.verificationTokenRepo();
    const saveEmailVerificationToken = new SaveEmailVerificationToken(
      verificationTokenRepo
    );

    const verificationTokenHandler = new EmailVerificationTokenHandler(
      saveEmailVerificationToken
    );
    await verificationTokenHandler.saveWithExpirationIn5min({
      email: reqBody.email,
      id,
    });

    const nodemailerSender = new NodemailerSendVerificationEmail();

    const sendEmail = new SendEmailVerification(nodemailerSender);

    const verificaitionEmailHandler = new SendVerificationEmailHandler(
      sendEmail
    );
    await verificaitionEmailHandler.send({
      id,
      email: reqBody.email,
      userName: reqBody.userName,
    });

    await MongoDB.disconnect();
    return res.status(200).json({ message: `Email sent to ${reqBody.email}` });
  } catch (err) {
    const errorWithVerification = err instanceof ErrorEmailVerification;
    const errorSendingEmail = err instanceof ErrorSendingEmail;
    const errorUnkown = err instanceof Error;

    if (errorWithVerification)
      return res.status(400).json({ message: err.info });

    if (errorSendingEmail) return res.status(500).json({ message: err.info });

    if (errorUnkown) return res.status(400).json({ message: err.message });
  }
}
