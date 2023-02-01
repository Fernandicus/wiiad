import { RoleType } from "@/src/common/domain/Role";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { AdsPage } from "@/components/ui/pages/ads/AdsPage";
import { PageLayout } from "@/components/ui/layouts/PageLayout";

export type AdType = "banner" | "video";

export default function Ads(props: { advertiser: IUserPrimitives }) {
  const advertiser = useAdvertiser();

  useEffect(() => {
    advertiser.initStore(props.advertiser);
  }, []);

  return (
    <PageLayout>
      <AdsPage />
    </PageLayout>
  );
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
