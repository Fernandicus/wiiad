import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { SendWSEvent } from "../SendWSEvent";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";

type TInsertUserWatchingAd = {
  userId: string;
  campaignId: string;
  timer: number;
  //onTimeout: ()=>void;
};

export class InsertUserWatchingAdHandler {
  constructor(private insertUser: InsertUserWatchingAd) {}

  insert({ userId, campaignId, timer }: TInsertUserWatchingAd) {
    this.insertUser.insert({
      userId: new UniqId(userId),
      campaignId: new UniqId(campaignId),
      timer: new AdTimer(timer),
    });
  }
}
