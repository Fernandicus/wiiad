import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { SectionHeader } from "../../items/SectionHeader";
import { CreditCardAdd } from "../../../payment/CreditCardAdd";
import { CreditCardOptionsButton } from "@/components/ui/payment/CreditCardOptionsButton";
import { MouseEvent } from "react";

interface IWalletDataSectionProps {
  paymentMethods: ICardDetailsPrimitives[];
  onAddPaymentMethod(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): Promise<void>;
}

export const WalletDataSection = ({
  paymentMethods,
  onAddPaymentMethod,
}: IWalletDataSectionProps) => {
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
                <button type="button" onClick={onAddPaymentMethod}>
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
                      pmId={pm.paymentMethodId}
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
