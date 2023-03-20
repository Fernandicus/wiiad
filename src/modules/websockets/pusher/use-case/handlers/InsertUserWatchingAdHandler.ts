import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { InsertUserWatchingAd } from "../InsertUserWatchingAd";

type TInserUserWatchingAd = {
  userId: string;
  seconds: number;
  onTimeout: () => void;
};

export class InsertUserWatchingAdHandler {
  constructor(private inserUser: InsertUserWatchingAd) {}

  insert({ onTimeout, seconds, userId }: TInserUserWatchingAd): void {
    this.inserUser.insert({
      userId: new UniqId(userId),
      timer: new AdTimer(seconds),
      onTimeout,
    });
  }
}
