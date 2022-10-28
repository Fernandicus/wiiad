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
      if (isNewUser) {
        const userNameFoundByName = await findUserHandler.findByUserName(
          data.userName
        );
        if (userNameFoundByName)
          throw new ErrorEmailVerification(
            `El nombre de ususario '${data.userName}' ya existe`
          );
        const userFoundByEmail = await findUserHandler.findByEmail(data.email);
        if (userFoundByEmail)
          throw new ErrorEmailVerification(
            `El email '${data.email}' ya está asignado a un usuario`
          );
        await SendVerificationEmailController.send(data, UniqId.generate());
      } else {
        const userFoundByEmail = await findUserHandler.findByEmail(data.email);
        if (!userFoundByEmail)
          throw new ErrorEmailVerification(
            `El email '${data.email}' no existe`
          );
        const user: ISendVerificationEmail = {
          email: userFoundByEmail.email,
          userName: userFoundByEmail.name,
          rol: userFoundByEmail.rol,
        };
        await SendVerificationEmailController.send(user, UniqId.generate());
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
