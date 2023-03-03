import { IApiRespReferralGetData } from "@/pages/api/v1/referral/get-data";
import {
  IReferralPrimitives,
  Referral,
} from "@/src/modules/referrals/domain/Referral";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import { IUserApiCalls } from "../domain/interfaces/IUserApiCalls";

export class FetchUserApiCalls implements IUserApiCalls {
  async getReferralData(): Promise<Referral> {
    const resp = await fetch(ApiRoutes.getUserReferralData);
    const apiResp = await getApiResponse<IApiRespReferralGetData>(resp);
    if (!resp.ok) throw new Error(apiResp.message);
    return Referral.fromPrimitives({
      id: apiResp.data!.id,
      userId: apiResp.data!.userId,
      referees: apiResp.data!.referees,
      referrers: apiResp.data!.referrers,
      refereeBalance: apiResp.data!.refereeBalance,
      referrerBalance: apiResp.data!.referrerBalance,
    });
  }
}
