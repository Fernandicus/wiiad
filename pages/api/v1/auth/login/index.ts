import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorVerificationEmail";
import { ErrorSendingEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorSendingEmail";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { ErrorCreatingUser } from "@/src/modules/users/user/domain/ErrorCreatingUser";
import { reqBodyParse } from "@/src/utils/helpers";
import { RoleType } from "@/src/common/domain/Role";
import { verificationEmailController } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";
import { ErrorSendVerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/errors/ErrorSendVerificationEmail";

export interface IApiReqSendEmailVerification {
  data: IVerificationEmailData;
  isNewUser: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);
  
  const { data, isNewUser }: IApiReqSendEmailVerification = reqBodyParse(req);

  try {
    const roleHandler = new HandleRolesHandler(data.role);
    await MongoDB.connectAndDisconnect(async () => {
      await roleHandler.forRole({
        USER: async () => {
          if (isNewUser) {
            await verificationEmailController.sendToNewUser(data);
          } else {
            await verificationEmailController.sendToUser(data);
          }
        },
        BUSINESS: async () => {
          if (isNewUser) {
            await verificationEmailController.sendToNewAdvertiser(data);
          } else {
            await verificationEmailController.sendToAdvertiser(data);
          }
        },
        AGENCY() {
          throw new ErrorSendVerificationEmail("The role is not authorized");
        },
      });

      /* if (data.role === RoleType.USER) {
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
      } */
    });

    return res.status(200).json({ message: `Email sent to ${data.email}` });
  } catch (err) {
    if (err instanceof ErrorVerificationEmail)
      return res.status(400).json({ message: err.message });

    if (err instanceof ErrorSendingEmail)
      return res.status(500).json({ message: err.info });

    if (err instanceof Error)
      return res.status(400).json({ message: err.message });
  }
}
