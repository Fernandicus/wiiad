import { Name } from "@/src/common/domain/Name";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import { InitializeWatchingAd } from "../InitializeWatchingAd";

type IInitializeWatchingAd = {
  referrerName: string;
  referee?: IUserPrimitives;
};

type IInitializeWatchingAdResp = {
  ad: AdPropsPrimitives;
  referrerProfile: IUserPrimitives;
  refereeValue: string;
};

export class InitializeWatchingAdHandler {
  constructor(private initWatchingAd: InitializeWatchingAd) {}

  async init({
    referrerName,
    referee,
  }: IInitializeWatchingAd): Promise<IInitializeWatchingAdResp> {
    const requiredData = await this.initWatchingAd.init({
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
