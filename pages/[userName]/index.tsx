import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { TGetSelectedWatchAdData } from "@/src/modules/campaign/use-case/SelectCampaignToWatch";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { AdViewPage } from "@/components/ui/pages/watch-ad/AdViewPage";
import { GetAdDuration } from "@/src/modules/ad/infraestructure/GetAdDuration";
import { UniqId } from "@/src/common/domain/UniqId";
import { insertUserWatchingAd } from "@/src/watching-ad/pusher/infrastructure/watching-ad-container";
import { Name } from "@/src/common/domain/Name";
import { selectCampaignToWatch } from "@/src/modules/campaign/infrastructure/campaign-container";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { AnonymReferenceId } from "@/src/common/domain/AnonymReferenceId";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

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

function getReferrerName(context: GetServerSidePropsContext): string {
  return context.resolvedUrl.split("/")[1];
}

function getRefereeId(session: IUserPrimitives | null): RefereeId {
  return session
    ? new RefereeId({ uniqId: new UniqId(session.id) })
    : new AnonymReferenceId(new RefereeId({ uniqId: UniqId.new() }));
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = userSession.getFromServer(context);
    if (session) {
      const handleRol = HandleRolesHandler.givenUser(session);
      handleRol.isRole("USER", {
        else(_) {
          throw new Error("User role is not of type 'User'");
        },
        then(user) {},
      });
    }

    const referrerName = getReferrerName(context);

    const props = await MongoDB.connectAndDisconnect<IWatchCampaignPage>(
      async () => {
        const { ad, campaignId, referrerProfile } = await getCampaignToWatch(
          referrerName,
          session
        );

        const refereeId = getRefereeId(session);
        const referrerId = new ReferrerId({ uniqId: referrerProfile.id });

        const getAdDuration = new GetAdDuration(ad.file);
        const adTimer = await getAdDuration.getAdDuration();

        await insertUserWatchingAd.insert({
          adDuration: adTimer,
          refereeId,
          referrerId,
          campaignId,
        });

        return {
          referrerProfile: {
            ...referrerProfile.toPrimitives(),
            id: referrerId.value(),
          },
          refereeValue: refereeId.value(),
          ad: ad.toPrimitives(),
        };
      }
    );

    return {
      props: props as IWatchCampaignPage,
    };
  } catch (err) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function getCampaignToWatch(
  referrerName: string,
  session: IUserPrimitives | null
): Promise<TGetSelectedWatchAdData> {
  //Todo: Implement a better algorithm to select an Ad inside the get method
  const data = await selectCampaignToWatch.get({
    referrerName: new Name(referrerName),
    sessionId: session ? new UniqId(session.id) : undefined,
  });

  return data;
}
