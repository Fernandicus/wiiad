import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";

type TInsertUserWatchingAd = {
  userId: string;
  campaignId: string;
  timer?: number;
};

export class InsertUserWatchingAdHandler {
  constructor(private insertUser: InsertUserWatchingAd) {}

  insert({ userId, campaignId, timer }: TInsertUserWatchingAd) {
    this.insertUser.insert({
      userId: new UniqId(userId),
      campaignId: new UniqId(campaignId),
      timer: !timer ? AdTimer.defaultTime() : new AdTimer(timer),
    });
  }
}
