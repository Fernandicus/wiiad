import { UniqId } from "@/src/common/domain/UniqId";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";
import {
  TNewWatchingAdTimeout,
  WatchingAdTimeout,
  WatchingAdTimeoutProps,
} from "../domain/WatchingAdTimeout";

type TInsertUserWatchingAd = Omit<TNewWatchingAdTimeout, "duration"> & {
  adDuration: AdDuration;
};

export class InsertUserWatchingAd {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async insert({
    refereeId,
    referrerId,
    adDuration,
    campaignId,
  }: TInsertUserWatchingAd): Promise<void> {
    await this.watchingAdRepo.add(
      WatchingAdTimeout.new({
        refereeId,
        referrerId,
        campaignId,
        duration: adDuration,
      })
    );
  }
}
