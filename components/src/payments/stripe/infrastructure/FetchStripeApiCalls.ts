import { IApiReqStripePaymentWithPMethod } from "@/pages/api/v1/payments/stripe/campaign/with-pmethod";
import {
  IApiReqStripePaymentWithoutPMethod,
  IApiRespStripePayWithoutPM,
} from "@/pages/api/v1/payments/stripe/campaign/without-pmethod";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import { ErrorFetchingStripePayment } from "../domain/errors/ErrorFetchingStripePayment";
import {
  IPaymentWithoutPMParams,
  IPaymentWithPMParams,
  IClientSecret,
  IStripeApiCalls,
} from "../domain/interfaces/StripeApiCalls";

export class FetchStripeApiCalls implements IStripeApiCalls {
  async payWithoutPMethod(
    params: IPaymentWithoutPMParams
  ): Promise<IClientSecret> {
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: params.adId.id,
      budgetItem: params.budgetItem.selectedBudget,
    };

    const resp = await fetch(ApiRoutes.stripePayWithoutPMethod, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const apiResp = await getApiResponse<IApiRespStripePayWithoutPM>(resp);

    if (resp.status !== 200)
      throw ErrorFetchingStripePayment.payWithoutPMethod(apiResp.message);

    return { clientSecret: apiResp.data!.clientSecret };
  }

  async payWithPMethod(params: IPaymentWithPMParams): Promise<void> {
    const body: IApiReqStripePaymentWithPMethod = {
      adId: params.adId.id,
      budgetItem: params.budgetItem.selectedBudget,
      paymentMethod: params.paymentMethod.id,
    };

    const resp = await fetch(ApiRoutes.stripePayWithPMethod, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const apiResp = await getApiResponse(resp);

    if (resp.status !== 200)
      throw ErrorFetchingStripePayment.payWithPMethod(apiResp.message);
  }
}
