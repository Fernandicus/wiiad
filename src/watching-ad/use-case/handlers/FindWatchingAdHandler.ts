import { Maybe } from "@/src/common/domain/Maybe";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { TWatchingAdTimeoutPrimitives } from "../../domain/WatchingAdTimeout";
import { FindWatchingAd } from "../FindWatchingAd";

export class FindWatchingAdHandler {
  constructor(private findWatchingAd: FindWatchingAd) {}

  async byRefereeValue(
    value: string
  ): Promise<Maybe<TWatchingAdTimeoutPrimitives>> {
    const watchingAdFound = await this.findWatchingAd.byRefereeId(
      RefereeId.fromString(value)
    );
    return watchingAdFound.match({
      some: (watchingAd) => Maybe.some(watchingAd.toPrimitives()),
      nothing: () => Maybe.nothing(),
    });
  }
}
