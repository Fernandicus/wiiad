import { Maybe } from "@/src/common/domain/Maybe";
import { UniqId } from "@/src/common/domain/UniqId";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";
import { WatchingAdTimeout } from "../domain/WatchingAdTimeout";
import { IWatchingAdModel, WatchingAdModel } from "./WatchingAdModel";

export class MongoDBWatchingAdRepo implements IWatchingAdRepo {
  async add(watchingAd: WatchingAdTimeout): Promise<void> {
    //todo: If referee id exists in the WatchingAdTimeout DB replace it
    //* Only one WatchingAdTimeout per referee

    const watchingAdPrimitives = watchingAd.toPrimitives();
    const model: IWatchingAdModel = {
      ...watchingAdPrimitives,
      _id: watchingAdPrimitives.id,
      creationDate: new Date(),
    };

    await WatchingAdModel.findOneAndUpdate(
      { refereeId: watchingAd.refereeId.uniqId.id },
      model,
      { upsert: true }
    );
  }

  async startTimer(refereeId: RefereeId): Promise<void> {
    await WatchingAdModel.updateOne(
      { refereeId: refereeId.uniqId.id },
      {
        $currentDate: { startedAt: true },
      }
    );
  }

  async findAdByRefereeId(
    refereeId: RefereeId
  ): Promise<Maybe<WatchingAdTimeout>> {
    const modelFound = await WatchingAdModel.findOne<IWatchingAdModel>({
      refereeId: refereeId.uniqId.id,
    });
    if (!modelFound) return Maybe.nothing();
    return Maybe.some(this.toWathingAd(modelFound));
  }

  async removeTimer(refereeId: RefereeId): Promise<void> {
    await WatchingAdModel.deleteOne({
      refereeId: refereeId.uniqId.id,
    });
  }

  private toWathingAd(model: IWatchingAdModel) {
    const hasStarted = model.startedAt ? true : false;

    return new WatchingAdTimeout({
      id: new UniqId(model._id),
      campaignId: new UniqId(model.campaignId),
      refereeId: RefereeId.givenUniqId(new UniqId(model.refereeId)),
      referrerId: ReferrerId.givenUniqId(new UniqId(model.referrerId)),
      duration: new AdDuration(model.duration),
      isStarted: hasStarted,
      isEnded: hasStarted
        ? this.adHasEnded({
            startedAt: model.startedAt!,
            duration: new AdDuration(model.duration),
          })
        : false,
    });
  }

  private adHasEnded(props: {
    startedAt: Date;
    duration: AdDuration;
  }): boolean {
    const startedAtTime = props.startedAt.getTime();
    const endAtTime = startedAtTime + props.duration.milliseconds;
    const latency = 1000;
    if (Date.now() < endAtTime - latency) return false;
    return true;
  }
}
