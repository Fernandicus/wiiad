import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { AdViewPage } from "@/components/ui/pages/watch-ad/AdViewPage";
import { initializeWatchingAdHandler } from "@/src/watching-ad/infrastructure/watching-ad-container";
import { RoleType } from "@/src/common/domain/Role";

export interface IWatchCampaignPage {
  refereeValue: string;
  ad: AdPropsPrimitives;
  referrerProfile: IUserPrimitives;
}

export default function Profile({
  refereeValue,
  ad,
  referrerProfile,
}: IWatchCampaignPage) {
  return (
    <AdViewPage
      ad={ad}
      referrerProfile={referrerProfile!}
      refereeValue={refereeValue}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, resolvedUrl } = context;

  try {
    const requiredData = await MongoDB.connectAndDisconnect<IWatchCampaignPage>(
      async () => {
        const session = userSession.getFromServer({ req, res });

        if (session && session.role !== RoleType.USER)
          throw new Error("User role is not of type 'User'");

        const referrerName = getReferrerNameFromURL(resolvedUrl);
  
        return await initializeWatchingAdHandler.init({
          referrerName,
          referee: session ? session : undefined,
        });
      }
    );

    return {
      props: requiredData as IWatchCampaignPage,
    };
  } catch (err) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

function getReferrerNameFromURL(resolvedUrl: string): string {
  return resolvedUrl.split("/")[1];
}
