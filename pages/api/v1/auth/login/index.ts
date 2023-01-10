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
    const errorCreatingUser = err instanceof ErrorCreatingUser;

    if (err instanceof ErrorVerificationEmail)
      return res.status(400).json({ message: err.message });

    if (err instanceof ErrorSendingEmail)
      return res.status(500).json({ message: err.info });

    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
