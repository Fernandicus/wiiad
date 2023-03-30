import { Name } from "@/src/common/domain/Name";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import { InitWatchingAd } from "../InitWatchingAd";

type IInitializeWatchingAd = {
  referrerName: string;
  referee?: IUserPrimitives;
};

type IInitializeWatchingAdResp = {
  ad: AdPropsPrimitives;
  referrerProfile: IUserPrimitives;
  refereeValue: string;
};

export class InitWatchingAdHandler {
  constructor(private initWatchingAd: InitWatchingAd) {}

  async initialize({
    referrerName,
    referee,
  }: IInitializeWatchingAd): Promise<IInitializeWatchingAdResp> {
    const requiredData = await this.initWatchingAd.initialize({
      referrerName: new Name(referrerName),
      referee: referee && User.fromPrimitives(referee),
    });

    return {
      ad: requiredData.ad.toPrimitives(),
      refereeValue: requiredData.refereeId.value(),
      referrerProfile: requiredData.referrerProfile.toPrimitives(),
    };
  }
}
