import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/ErrorSendingEmail";
import {
  verificationEmailHandler,
  sendEmailHandler,
} from "@/src/modules/mailing/send-email-verification/email-verification-container";

export interface ISendVerificationEmailBodyRequest {
  email: string;
  userName: string;
  rol: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: ISendVerificationEmailBodyRequest = JSON.parse(req.body); //req.body;//

  if (
    reqBody.email == undefined ||
    reqBody.userName == undefined ||
    reqBody.rol == undefined
  )
    return res.status(400).json({message:"Missing Data"});

  try {
    const id = UniqId.generate();

    await MongoDB.connect();

    await verificationEmailHandler.saveWithExpirationIn5min({
      email: reqBody.email,
      id,
      rol: reqBody.rol,
    });

    await sendEmailHandler.send({
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
