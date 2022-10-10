import { LogInQueryParams } from "@/src/domain/LogInQueryParams";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, NextPage } from "next";
import jwt from "jsonwebtoken";
import { ValidateVerificationEmail } from "@/src/mailing/send-email-verification/use-case/ValidateVerificationEmail";
import { JsonWebTokenNPM } from "@/src/mailing/send-email-verification/infrastructure/JsonWebTokenNPM";
import { ManageJWT } from "@/src/mailing/send-email-verification/use-case/ManageJWT";
import { Advertiser } from "@/src/advertiser/domain/Advertiser";
import { Email } from "@/src/domain/Email";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";

export interface IProfilePageProps {
  userName: string;
  rol: string;
  email: string;
}

export interface IJWTProps {
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
    const queryData = new LogInQueryParams(query, params);

    const verificatioEmailRepo = await MongoDB.verificationEmailRepo();
    const validateEmail = new ValidateVerificationEmail(verificatioEmailRepo);
    const verificationEmail = await validateEmail.validate(queryData.token);


    //TODO: Find Advertiser/User and get id

    //TODO: use-case CreateJWT
    const payload: IJWTProps = {
      email: verificationEmail.email,
      rol: verificationEmail.rol,
      userName: queryData.userName,
    };
    const jwToken = jwt.sign(payload, process.env.JWT_SECRET!);

    //TODO: use-case Remove VerificationEmail

    await verificatioEmailRepo.remove(verificationEmail.id);

    await MongoDB.disconnect();

    return {
      props: {
        jwt: jwToken,
      },
    } as IUserNameSSPResponse;
  } catch (err) {
    return {
      props: {},
      redirect: "/",
    };
  }
};
