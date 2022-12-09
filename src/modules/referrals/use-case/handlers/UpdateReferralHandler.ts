import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { UpdateReferral } from "../UpdateReferral";

export class UpdateReferralHandler {
  constructor(private update: UpdateReferral) {}

  async increaseReferrerBalance(
    userId: string,
    balanceToAdd: number
  ): Promise<void> {
    const uniqUserId = new UniqId(userId);
    const balance = new Balance(balanceToAdd);
    await this.update.increaseReferrerBalance(uniqUserId, balance);
  }

  async increaseRefereeBalance(
    userId: string,
    balanceToAdd: number
  ): Promise<void> {
    const uniqUserId = new UniqId(userId);
    const balance = new Balance(balanceToAdd);
    await this.update.increaseRefereeBalance(uniqUserId, balance);
  }

  async increaseWatchedAds(refereeId:string):Promise<void>{
    const userId = new UniqId(refereeId);
    await this.update.increaseWatchedAds(userId)
  }

  async increaseReferredUsers(refereeId:string):Promise<void>{
    const userId = new UniqId(refereeId);
    await this.update.increaseReferredUsers(userId)
  }
}