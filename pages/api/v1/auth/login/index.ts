import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorVerificationEmail";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorSendingEmail";
import { SendVerificationEmailController } from "@/src/modules/mailing/send-email-verification/infrastructure/controllers/SendVerificationEmailController";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingUser } from "@/src/modules/users/user/domain/ErrorCreatingUser";
import { reqBodyParse } from "@/src/utils/helpers";
import { RoleType } from "@/src/common/domain/Role";
import { JsonWebTokenNPM } from "@/src/modules/session/infrastructure/JsonWebTokenNPM";
import { verificationEmailController } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";

export interface APISendEmailVerification {
  data: IVerificationEmailData;
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
          await verificationEmailController.sendToNewUser(data);
        } else {
          await verificationEmailController.sendToUser(data);
        }
      } else {
        if (isNewUser) {
          await verificationEmailController.sendToNewAdvertiser(data);
        } else {
          await verificationEmailController.sendToAdvertiser(data);
        }
      }
    });

    return res.status(200).json({ message: `Email sent to ${data.email}` });
  } catch (err) {
    console.error(err);
    const errorCreatingUser = err instanceof ErrorCreatingUser;

    if (err instanceof ErrorVerificationEmail)
      return res.status(400).json({ message: err.message });

    if (err instanceof ErrorSendingEmail)
      return res.status(500).json({ message: err.info });

    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
