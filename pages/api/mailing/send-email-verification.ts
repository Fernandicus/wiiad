import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/ErrorSendingEmail";
import { SendVerificationEmailController } from "@/src/modules/mailing/send-email-verification/controller/SendVerificationEmailController";
import { ISendVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/ISendVerificationEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: ISendVerificationEmail =
    typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

  try {
    await MongoDB.connectAndDisconnect(
      async () => await SendVerificationEmailController.send(reqBody)
    );

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
