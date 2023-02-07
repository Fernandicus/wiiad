import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { SectionHeader } from "../../items/SectionHeader";
import { CreditCard } from "../../../payment/CreditCard";
import { CreditCardAdd } from "../../../payment/CreditCardAdd";
import { CreditCardOptionsButton } from "@/components/ui/payment/CreditCardOptionsButton";
import { getApiResponse } from "@/src/utils/helpers";
import { IApiRespSetupIntent } from "@/pages/api/v1/payments/stripe/setup-intent";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useState } from "react";
import StripePaymentElement from "@/components/ui/payment/StripePaymentElement";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";

interface IWalletDataSectionProps {
  paymentMethods: ICardDetailsPrimitives[];
  onAddPaymentMethod(clientSecret: string): void;
}

export const WalletDataSection = ({
  onAddPaymentMethod,
  paymentMethods,
}: IWalletDataSectionProps) => {
  const { setupIntentClientSecret } = useUserStripe();
  return (
    <div className=" overflow-scroll pb-5">
      <SectionHeader
        titleLable="Monedero"
        descriptionLabel="Añade tarjetas nuevas o elimina las que ya no utilices"
      />
      <div className="flex justify-end items-center">
        <div className="w-full">
          <div className="  w-full">
            <div className="flex space-x-5 ">
              <div>
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const secret = await setupIntentClientSecret();
                      onAddPaymentMethod(secret);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <CreditCardAdd />
                </button>
              </div>
              {paymentMethods.map((pm) => {
                return (
                  <div key={pm.paymentMethodId}>
                    <CreditCardOptionsButton
                      owner="Mi Empresa S.L."
                      brand={pm.brand}
                      expMonth={pm.expMonth}
                      expYear={pm.expYear}
                      last4={pm.last4}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
