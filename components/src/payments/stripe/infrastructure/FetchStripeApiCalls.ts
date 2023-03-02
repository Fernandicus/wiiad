import { IApiReqStripePaymentWithPMethod } from "@/pages/api/v1/payments/stripe/campaign/with-pmethod";
import {
  IApiReqStripePaymentWithoutPMethod,
  IApiRespStripePayWithoutPM,
} from "@/pages/api/v1/payments/stripe/campaign/without-pmethod";
import { IApiRespGetCardDetails } from "@/pages/api/v1/payments/stripe/cards/get-card-details";
import { IApiReqRemovePaymentMethod } from "@/pages/api/v1/payments/stripe/remove-pm";
import { IApiReqSaveNewPaymentM } from "@/pages/api/v1/payments/stripe/save-new-pm";
import { IApiRespSetupIntent } from "@/pages/api/v1/payments/stripe/setup-intent";
import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
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
  async removePM(pm: PaymentMethodId): Promise<void> {
    const body: IApiReqRemovePaymentMethod = {
      pmId: pm.id,
    };
    const resp = await fetch(ApiRoutes.stripeRemovePaymentMethod, {
      method: "DELETE",
      body: JSON.stringify(body),
    });

    if (!resp.ok) throw ErrorFetchingStripePayment.removingPM();
  }

  async getCardDetails(pm: PaymentMethodId): Promise<CardDetails> {
    const resp = await fetch(ApiRoutes.stripeGetCardDetails(pm.id));
    const apiResp = await getApiResponse<IApiRespGetCardDetails>(resp);
    if (!resp.ok) throw ErrorFetchingStripePayment.gettingCreditCard();
    if (!apiResp.data) throw ErrorFetchingStripePayment.noDataProvided();
    return new CardDetails({
      brand: new CardBrand(apiResp.data.brand),
      expMonth: new ExpMonth(apiResp.data.expMonth),
      expYear: new ExpYear(apiResp.data.expYear),
      last4: new Last4(apiResp.data.last4),
      paymentMethodId: new PaymentMethodId(apiResp.data.paymentMethodId),
    });
  }

  async setupIntent(): Promise<StripeClientSecret> {
    const resp = await fetch(ApiRoutes.stripeSetupIntent);
    const apiResp = await getApiResponse<IApiRespSetupIntent>(resp);
    if (!resp.ok) throw ErrorFetchingStripePayment.setupIntent();
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

    if (!resp.ok)
      throw new ErrorFetchingStripePayment(
        "Somethign went wrong saving new payment method"
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

    if (resp.status !== 200) throw ErrorFetchingStripePayment.payWithPMethod();
  }
}
