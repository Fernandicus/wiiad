import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { UniqId } from "@/src/utils/UniqId";
import { SaveEmailVerification } from "@/src/mailing/send-email-verification/use-case/SaveEmailVerification";
import { EmailVerificationTokenHandler } from "@/src/mailing/send-email-verification/handler/EmailVerificationTokenHandler";
import { NodemailerSendVerificationEmail } from "@/src/mailing/send-email-verification/infrastructure/NodemailerSendVerificationEmail";
import { SendlVerificationEmail } from "@/src/mailing/send-email-verification/use-case/SendVerificationEmail";
import { SendVerificationEmailHandler } from "@/src/mailing/send-email-verification/handler/SendVerificationEmailHandler";
import { ErrorEmailVerification } from "@/src/mailing/send-email-verification/domain/ErrorEmailVerification";
import { ErrorSendingEmail } from "@/src/mailing/send-email-verification/domain/ErrorSendingEmail";
import { SMTPData } from "@/src/mailing/send-email-verification/domain/SMTPData";
import { IEmailSender } from "@/src/mailing/send-email-verification/domain/IEmailSender";

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
    const saveEmailVerification = new SaveEmailVerification(
      verificationTokenRepo
    );

    const verificationTokenHandler = new EmailVerificationTokenHandler(
      saveEmailVerification
    );
    await verificationTokenHandler.saveWithExpirationIn5min({
      email: reqBody.email,
      id,
    });

    const nodemailerSender = new NodemailerSendVerificationEmail();

    const sendEmail = new SendlVerificationEmail(nodemailerSender);

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
