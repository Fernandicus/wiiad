import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/ErrorSendingEmail";
import { SendVerificationEmailController } from "@/src/modules/mailing/send-email-verification/controller/SendVerificationEmailController";
import { ISendVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/ISendVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { FindUser } from "@/src/modules/user/use-case/FindUser";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorCreatingUser } from "@/src/modules/user/domain/ErrorCreatingUser";
import { reqBodyParse } from "@/src/utils/utils";
import { RolType } from "@/src/domain/Rol";
import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";

export interface APISendEmailVerification {
  data: ISendVerificationEmail;
  isNewUser: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: APISendEmailVerification = reqBodyParse(req);

  const { data, isNewUser } = reqBody;

  console.log({ data, isNewUser });

  try {
    await MongoDB.connectAndDisconnect(async () => {
      if (data.rol === RolType.USER) {
        if (isNewUser) {
          await SendVerificationEmailController.sendToNewUser(
            data,
            UniqId.generate()
          );
        } else {
          await SendVerificationEmailController.sendToUser(
            data,
            UniqId.generate()
          );
        }
      } else {
        if (isNewUser) {
          await SendVerificationEmailController.sendToNewAdvertiser(
            data,
            UniqId.generate()
          );
        } else {
          await SendVerificationEmailController.sendToAdvertiser(
            data,
            UniqId.generate()
          );
        }
      }
    });

    return res.status(200).json({ message: `Email sent to ${data.email}` });
  } catch (err) {
    console.error(err);
    const errorWithVerification = err instanceof ErrorEmailVerification;
    const errorSendingEmail = err instanceof ErrorSendingEmail;
    const errorCreatingUser = err instanceof ErrorCreatingUser;
    const errorUnkown = err instanceof Error;

    if (errorWithVerification)
      return res.status(400).json({ message: err.info });

    if (errorSendingEmail) return res.status(500).json({ message: err.info });

    if (errorUnkown) return res.status(400).json({ message: err.message });
  }
}
