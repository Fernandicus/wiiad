import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useEffect } from "react";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { CampaignsPage } from "@/components/ui/pages/campaigns/CampaignsPage";
import { PageLayout } from "@/components/ui/layouts/PageLayout";

export default function Campaigns(props: { advertiser: IUserPrimitives }) {
  const { initStore } = useAdvertiser();

  useEffect(() => {
    initStore(props.advertiser);
  }, []);

  return (
    <PageLayout>
      <CampaignsPage />
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);

  if (!session || session.role === RoleType.USER)
    return { props: {}, redirect: { destination: "/", permanent: false } };

  const paymentIntent = context.query["payment_intent"] as string;

  if (!paymentIntent)
    return {
      props: { advertiser: session },
    };
  return {
    props: {
      advertiser: session,
    },
    redirect: { destination: `/${session.name}/campaigns`, permanent: false },
  };
};
