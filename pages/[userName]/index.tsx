import { LogInQueryParams } from "@/src/domain/LogInQueryParams";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, NextPage } from "next";
import { ValidateVerificationEmail } from "@/src/mailing/send-email-verification/use-case/ValidateVerificationEmail";
import { JsonWebTokenNPM } from "@/src/mailing/send-email-verification/infrastructure/JsonWebTokenNPM";
import { ManageJWT } from "@/src/mailing/send-email-verification/use-case/ManageJWT";
import { Advertiser } from "@/src/advertiser/domain/Advertiser";
import { Email } from "@/src/domain/Email";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { FindAdvertiser } from "@/src/advertiser/use-case/FindAdvertiser";
import { CreateAdvertiser } from "@/src/advertiser/use-case/CreateAdvertiser";
import { AdvertiserCreatorHandler } from "@/src/advertiser/handler/AdvertiserCreatorHandler";
import { UniqId } from "@/src/utils/UniqId";
import { Rol } from "@/src/domain/Rol";
import { Name } from "@/src/domain/Name";
import { VerificationTokenId } from "@/src/mailing/send-email-verification/domain/VerificationTokenId";
import { ValidateEmailHandler } from "@/src/mailing/send-email-verification/handler/ValidateEmailHandler";
import { validateEmailHandler } from "@/src/mailing/send-email-verification/email-verification-container";
import {
  createAdvertiserHandler,
  findAdvertiserHandler,
} from "@/src/advertiser/advertiser-container";

export interface IProfilePageProps {
  userName: string;
  rol: string;
  email: string;
}

export interface IUserNameSSPResponse {
  props: {
    jwt: string;
  };
}

const ProfilePage: NextPage<IProfilePageProps> = (props) => {
  let { userName } = props;

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, params } = context;

  try {
    const logInData = new LogInQueryParams(query, params);

    const verificatioEmailRepo = await MongoDB.verificationEmailRepo();
    const verificationEmail = await validateEmailHandler.validateToken(
      logInData.token
    );

    //TODO: Find Advertiser/User and get id
    const advertiserPrimitives = await findAdvertiserHandler.findById(
      verificationEmail.email
    );

    //TODO: If is new Advertiser create new
    let advertiserId: string;

    if (!advertiserPrimitives) {
      advertiserId = UniqId.generate();
      await createAdvertiserHandler.create({
        email: verificationEmail.email,
        name: logInData.userName,
        rol: verificationEmail.rol,
        id: advertiserId,
      });
    } else {
      advertiserId = advertiserPrimitives.id;
    }

    //TODO: use-case CreateJWT
    const jwtRepo = new JsonWebTokenNPM();
    const manageJWT = new ManageJWT(jwtRepo);
    const payload = new Advertiser({
      id: new AdvertiserId(advertiserId),
      email: new Email(verificationEmail.email),
      rol: new Rol(verificationEmail.rol),
      name: new Name(logInData.userName),
    });
    const jwt = manageJWT.createAdvertiserToken(payload);

    //TODO: use-case Remove VerificationEmail
    await verificatioEmailRepo.remove(verificationEmail.id);

    await MongoDB.disconnect();

    return {
      props: {
        jwt,
      },
    } as IUserNameSSPResponse;
  } catch (err) {
    return {
      props: {},
      redirect: "/",
    };
  }
};
