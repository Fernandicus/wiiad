import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../../../ad/domain/value-objects/AdTimer";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";

type TInsertUserWatchingAd = {
  userId: string;
  campaignId: string;
  seconds?: number;
};

export class InsertUserWatchingAdHandler {
  constructor(private insertUser: InsertUserWatchingAd) {}

  insert({ userId, campaignId, seconds }: TInsertUserWatchingAd) {
    this.insertUser.insert({
      userId: new UniqId(userId),
      campaignId: new UniqId(campaignId),
      timer: !seconds ? AdTimer.defaultTime() : new AdTimer(seconds),
    });
  }
}
