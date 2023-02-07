import { IApiReqStripePaymentWithPMethod } from "@/pages/api/v1/payments/stripe/campaign/with-pmethod";
import {
  IApiReqStripePaymentWithoutPMethod,
  IApiRespStripePayWithoutPM,
} from "@/pages/api/v1/payments/stripe/campaign/without-pmethod";
import { IApiReqSaveNewPaymentM } from "@/pages/api/v1/payments/stripe/save-new-pm";
import { IApiRespSetupIntent } from "@/pages/api/v1/payments/stripe/setup-intent";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";
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
  async setupIntent(): Promise<StripeClientSecret> {
    const resp = await fetch(ApiRoutes.stripeSetupIntent);
    const apiResp = await getApiResponse<IApiRespSetupIntent>(resp);
    if (resp.status !== 200)
      throw ErrorFetchingStripePayment.setupIntent(apiResp.message);
    if (!apiResp.data) throw ErrorFetchingStripePayment.noDataProvided();
    return new StripeClientSecret(apiResp.data.client_secret);
  }

  async saveNewPaymentMethod(pm: PaymentMethodId): Promise<void> {
    const body: IApiReqSaveNewPaymentM = {
      pmId: pm.id,
    };
    const resp = await fetch(ApiRoutes.stripeSaveNewPaymentMethod, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const apiResp = await getApiResponse(resp);
    if (resp.status !== 200)
      throw new ErrorFetchingStripePayment(
        "Somethign went wrong saving new payment method",
        { cause: apiResp.message }
      );
  }

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
