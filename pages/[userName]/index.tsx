import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { LogInQueryParams } from "@/src/domain/LogInQueryParams";
import { Rol, RolType } from "@/src/domain/Rol";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { EmailVerificationConstants } from "@/src/mailing/send-email-verification/EmailVerificationConstants";
import { VerificationEmailMongoDBRepo } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
import { GetServerSideProps, NextPage } from "next";
import jwt from "jsonwebtoken";

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
    const verificationEmail = await verificatioEmailRepo.findById(queryData.token);

    //TODO: use-case ValidateVerificationEmail
    if (!verificationEmail) throw new ErrorLogIn("Missing Verification Email");
    if (
      verificationEmail.expirationDate.getTime() <
      new Date(Date.now()).getTime()
    ) {
      await verificatioEmailRepo.remove(verificationEmail.id);
      throw new ErrorLogIn("Verification Token has expired");
    }

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
