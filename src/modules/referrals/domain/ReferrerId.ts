import {
  AReferenceId,
  ReferenceIdProps,
} from "@/src/common/domain/interfaces/AReferenceId";
import { UniqId } from "@/src/common/domain/UniqId";
import { verifyIdFromString } from "@/src/utils/helpers";

type TReferrerId = "referrer";

export class ReferrerId extends AReferenceId<TReferrerId> {
  constructor({ uniqId, prefix }: ReferenceIdProps) {
    super({ type: "referrer", uniqId, prefix });
  }

  static fromString(value: string): ReferrerId {
    const referrer: TReferrerId = "referrer";
    const verifiedData = verifyIdFromString(value, referrer);
    return new ReferrerId(verifiedData);
  }

  static new():ReferrerId{
    return new ReferrerId({uniqId: UniqId.new()})
  }
}
