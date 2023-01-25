import { Ad } from "@/src/modules/ad/domain/Ad";
import { IAdsApiCalls } from "../domain/interfaces/IAdsApiCalls";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import { ErrorFetchingAdvertiser } from "../domain/interfaces/ErrorFetchingAd";
import { UniqId } from "@/src/utils/UniqId";

export class FetchAdsApiCalls implements IAdsApiCalls {
  async removeAd(ad: UniqId): Promise<void> {
    const resp = await fetch(ApiRoutes.removeAds, {
      method: "DELETE",
      body: JSON.stringify({ adId: ad.id }),
    });
    if (resp.status !== 200) {
      const apiResp = await getApiResponse(resp);
      throw ErrorFetchingAdvertiser.remoingAd(apiResp.message);
    }
  }

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
