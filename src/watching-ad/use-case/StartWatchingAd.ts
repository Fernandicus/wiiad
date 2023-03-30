import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { FindWatchingAd } from "./FindWatchingAd";
import { FinishWatchingAd } from "./FinishWatchingAd";
import { InitWatchingAdTimer } from "./InitWatchingAdTimer";

type TStartWatchingAdProps = {
  findWatchingAd: FindWatchingAd;
  initWatchingAdTimer: InitWatchingAdTimer;
  updateReferral: UpdateReferral;
  updateCampaignMetrics: UpdateCampaignData;
};

export class StartWatchingAd {
  private findWatchingAd;
  private initWatchingAdTimer;
  private updateReferral;
  private updateCampaignMetrics;

  constructor(props: TStartWatchingAdProps) {
    this.findWatchingAd = props.findWatchingAd;
    this.initWatchingAdTimer = props.initWatchingAdTimer;
    this.updateReferral = props.updateReferral;
    this.updateCampaignMetrics = props.updateCampaignMetrics;
  }

  async start(props: { refereeId: RefereeId; referrerId: ReferrerId }): Promise<void> {
    const { refereeId, referrerId } = props;
    const watchingAdFound = await this.findWatchingAd.byRefereeId(refereeId);
    
    await watchingAdFound.match({
      some: async (watchingAd) => {
        await Promise.allSettled([
          this.initWatchingAdTimer.start(refereeId),
          this.updateReferral.increaseReferredUsers(referrerId),
          this.updateCampaignMetrics.increaseViews(watchingAd.campaignId),
        ]);
      },
      nothing() {
        throw new Error(
          `Referee ${refereeId.value()} has not initialized a watching ad`
        );
      },
    });
  }
}
