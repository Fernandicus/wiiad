import { RoleType } from "@/src/common/domain/Role";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdsPage } from "@/components/ui/pages/ads/AdsPage";

export type AdType = "banner" | "video";

export default function Ads(props: {advertiser: IUserPrimitives}) {
  const { initStore, status } = useAdvertiser();

  useEffect(() => {
    if (status === "non-init") initStore(props.advertiser);
  }, []);

  return <AdsPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = userSession.getFromServer(context);
    if (!session || session.role === RoleType.USER)
      throw new Error("The user is not do not have access");

    console.log(session);

    return {
      props: {
        advertiser: session,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
