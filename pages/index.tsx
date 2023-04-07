import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { SignInPage } from "@/components/ui/pages/sign-in/SignInPage";

export default function Home() {
  return (
    <SignInPage/>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (session)
    return {
      props: {},
      redirect: {
        destination: `/profile` //`/${session.name}`,
      },
    };
  return {
    props: {
      session,
    },
  };
};
