import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "../../domain/RefereeId";
import { ReferrerId } from "../../domain/ReferrerId";
import { UpdateReferral } from "../UpdateReferral";

export class UpdateReferralHandler {
  constructor(private update: UpdateReferral) {}

  async increaseReferrerBalance(
    referrerId: string,
    balanceToAdd: number
  ): Promise<void> {
    const referrer =  ReferrerId.fromString(referrerId);
    const balance = new Balance(balanceToAdd);
    await this.update.increaseReferrerBalance(referrer, balance);
  }

  async increaseRefereeBalance(
    refereeId: string,
    balanceToAdd: number
  ): Promise<void> {
    const referee = RefereeId.fromString(refereeId);
    const balance = new Balance(balanceToAdd);
    await this.update.increaseRefereeBalance(referee, balance);
  }

  async increaseWatchedAds(refereeId:string):Promise<void>{
    const referee = RefereeId.fromString(refereeId);
    await this.update.increaseWatchedAds(referee)
  }

  async increaseReferredUsers(referrerId:string):Promise<void>{
    const referrer =  ReferrerId.fromString(referrerId);
    await this.update.increaseReferredUsers(referrer)
  }
}
