import { Ad } from "@/src/modules/ad/domain/Ad";
import { IAdsApiCalls } from "../domain/interfaces/IAdsApiCalls";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import { ErrorFetchingAdvertiser } from "../domain/interfaces/ErrorFetchingAd";

export class FetchAdsApiCalls implements IAdsApiCalls {
  async createAd(ad: Ad): Promise<void> {
    const resp = await fetch(ApiRoutes.createAd, {
      method: "POST",
      body: JSON.stringify(ad.toPrimitives()),
    });
    if (resp.status !== 200) {
      const apiResp = await getApiResponse(resp);
      throw ErrorFetchingAdvertiser.creatingAd(apiResp.message);
    }
  }
}
