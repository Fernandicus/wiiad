import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UniqId } from "@/src/common/domain/UniqId";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";
import { TNewWatchingAdTimeout } from "../../domain/WatchingAdTimeout";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";

type TInsertUserWatchingAd = {
  referrerId: string;
  refereeId: string;
  campaignId: string;
  adDuration?: number;
};

export class InsertUserWatchingAdHandler {
  constructor(private insertUser: InsertUserWatchingAd) {}

  insert(props: TInsertUserWatchingAd) {
    const { referrerId, refereeId, campaignId, adDuration } = props;
    this.insertUser.insert({
      referrerId:  ReferrerId.fromString(referrerId),
      refereeId:  RefereeId.fromString(refereeId),
      campaignId: new UniqId(campaignId),
      adDuration: !adDuration ? AdDuration.defaultTime() : new AdDuration(adDuration),
    });
  }
}
