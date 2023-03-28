import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UniqId } from "@/src/common/domain/UniqId";
import { AdTimer } from "../../../../ad/domain/value-objects/AdTimer";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";

type TInsertUserWatchingAd = {
  referrerId: string;
  refereeId: string;
  campaignId: string;
  seconds?: number;
};

export class InsertUserWatchingAdHandler {
  constructor(private insertUser: InsertUserWatchingAd) {}

  insert(props: TInsertUserWatchingAd) {
    const { referrerId, refereeId, campaignId, seconds } = props;
    this.insertUser.insert({
      referrerId:  ReferrerId.fromString(referrerId),
      refereeId:  RefereeId.fromString(refereeId),
      campaignId: new UniqId(campaignId),
      timer: !seconds ? AdTimer.defaultTime() : new AdTimer(seconds),
    });
  }
}
