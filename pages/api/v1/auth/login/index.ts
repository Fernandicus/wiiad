import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorVerificationEmail";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorSendingEmail";
import { SendVerificationEmailController } from "@/src/modules/mailing/send-email-verification/controller/SendVerificationEmailController";
import { ISendVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/interfaces/ISendVerificationEmailRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FindUser } from "@/src/modules/user/use-case/FindUser";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorCreatingUser } from "@/src/modules/user/domain/ErrorCreatingUser";
import { reqBodyParse } from "@/src/utils/utils";
import { RoleType } from "@/src/domain/Role";
import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";

export interface APISendEmailVerification {
  data: ISendVerificationEmailRepo;
  isNewUser: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const { data, isNewUser }: APISendEmailVerification = reqBodyParse(req);

  try {
    await MongoDB.connectAndDisconnect(async () => {
      if (data.role === RoleType.USER) {
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
    const errorWithVerification = err instanceof ErrorVerificationEmail;
    const errorSendingEmail = err instanceof ErrorSendingEmail;
    const errorCreatingUser = err instanceof ErrorCreatingUser;
    const errorUnkown = err instanceof Error;

    if (errorWithVerification)
      return res.status(400).json({ message: err.message });

    if (errorSendingEmail) return res.status(500).json({ message: err.info });

    if (errorUnkown) return res.status(400).json({ message: err.message });
  }
}
