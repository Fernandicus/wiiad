import { UpdateCampaignMetrics } from "@/src/modules/campaign/use-case/UpdateCampaignMetrics";
import { UniqId } from "@/src/utils/UniqId";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

export class FinishWatchingAd {
  constructor(
    private updateCampaignMetrics: UpdateCampaignMetrics,
    private watchingAdList: WatchAdTimerList
  ) {}

  async hasFinish(userId: UniqId): Promise<void> {
    const update = async () =>
      await this.updateCampaignMetrics.addReferral({
        campaignId: UniqId.new(),
        referralId: UniqId.new(),
      });

    await this.watchingAdList.findAdByUserId(userId).match({
      some: async (adTimeout) => {
        if (adTimeout.isEnded()) {
          console.log("Ad finished, adding referral");
          await update();
        }else{
          throw new Error("Ad has not finished");
        }
      },
      nothing() {
        throw new Error("User id is not in the list");
      },
    });
  }
}
