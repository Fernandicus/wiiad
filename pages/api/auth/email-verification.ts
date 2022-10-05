import { MongoDB } from "@/src/infrastructure/MongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { UniqId } from "@/src/utils/UniqId";
import { SaveEmailVerificationToken } from "@/src/email-verification/use-case/SaveEmailVerificationToken";
import { EmailVerificationTokenHandler } from "@/src/email-verification/handler/EmailVerificationTokenHandler";
import { NodemailerSendVerificationEmail } from "@/src/email-verification/infrastructure/SendVerificationEmail";

export interface IVerificationTokenBodyRequest {
  email: string;
  userName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);

  const reqBody: IVerificationTokenBodyRequest = req.body; //JSON.parse(req.body);

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

    /* const transport = createTransport({
      host: process.env.SMTP_SERVER!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    

    const result = await transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: reqBody.email,
      subject: `Sign in to ${process.env.BASE_URL}`,
      text: text({
        url: verificationUrl,
        host: process.env.BASE_URL!,
      }),
      html: html({
        url: verificationUrl,
        host: process.env.BASE_URL!,
        theme: { brandColor: undefined },
      }),
    }); */

    

    await MongoDB.disconnect();
    return res.status(200).json({});
  } catch (err) {
    return res.status(400);
  }
}