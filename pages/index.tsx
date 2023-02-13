import { useRef, useState } from "react";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { RoleType } from "@/src/common/domain/Role";
import { TertiaryButton } from "@/components/ui/buttons/TertiaryButton";
import { SignInCard } from "@/components/ui/forms/sign-in/SignInCard";
import { useNotification } from "@/components/hooks/useNotification";

export default function Home(props: { session: IUserPrimitives }) {
  const [userRole, setRole] = useState<RoleType>(RoleType.USER);
  const { setNotification } = useNotification();

  const isUserRole = userRole === RoleType.USER;
  const tertiaryButtonLabel = isUserRole
    ? "Quiero anunciarme!"
    : `Soy influencer!`;

  return (
    <div className=" h-screen bg-slate-50">
      <div className="w-full max-w-lg mx-auto flex items-center h-full">
        <div className="space-y-20 w-full">
          <SignInCard
            logIn
            userRole={userRole}
            onErrorSubmit={(err) => {
              setNotification({
                message: err.cause as string,
                status: "error",
              });
            }}
            onSuccessSubmit={() => {
              setNotification({
                message: "Te hemos enviado un email",
                status: "success",
              });
            }}
          />
          <div className="space-x-2 w-full text-center">
            <TertiaryButton
              type="button"
              onClick={() => {
                if (!isUserRole) setRole(RoleType.USER);
                else setRole(RoleType.BUSINESS);
              }}
            >
              {tertiaryButtonLabel}
            </TertiaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);
  if (session)
    return {
      props: {},
      redirect: {
        destination: `/${session.name}`,
      },
    };
  return {
    props: {
      session,
    },
  };
};
