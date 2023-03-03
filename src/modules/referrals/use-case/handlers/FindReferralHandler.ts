import { Maybe } from "@/src/common/domain/Maybe";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralPrimitives, Referral } from "../../domain/Referral";
import { FindReferral } from "../FindReferral";

export class FindReferralHandler {
  constructor(private findReferral: FindReferral) {}

  async byUserId(id: string): Promise<Maybe<IReferralPrimitives>> {
    const uniqId = new UniqId(id);
    const referralFound = await this.findReferral.findByUserId(uniqId);
    return referralFound.match({
      nothing: () => Maybe.nothing(),
      some: (value) => Maybe.some(value.toPrimitives()),
    });
  }
}
