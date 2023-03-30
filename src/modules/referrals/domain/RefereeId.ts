import { AReferenceId, ReferenceIdProps } from "@/src/common/domain/interfaces/AReferenceId";
import { UniqId } from "@/src/common/domain/UniqId";
import { verifyIdFromString } from "@/src/utils/helpers";

type TRefereeId = "referee";

export class RefereeId extends AReferenceId<TRefereeId> {
  constructor({ uniqId, prefix }: ReferenceIdProps) {
    super({ uniqId, type: "referee", prefix });
  }

  static givenUniqId(uniqId:UniqId):RefereeId{
    return new RefereeId({uniqId})
  }

  static new(): RefereeId {
    return new RefereeId({
      uniqId: UniqId.new(),
    });
  }

  static fromString(value: string): RefereeId {
    const referrer: TRefereeId = "referee";
    const verifiedData = verifyIdFromString(value, referrer);
    return new RefereeId(verifiedData);
  }

}
