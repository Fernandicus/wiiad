import { StripePaymentProcess } from "../../src/payments/StripePaymentProcess";
import { CreditCards } from "./CreditCards";
import { Budgets } from "./Budgets";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { useSetBudgetAndPM } from "./hooks/useSetBudgetAndPM";
import { useUserStripe } from "@/components/hooks/advertiser/modules/payments/stripe/useUserStripe";
import { PaymentButtons } from "./PaymentButtons";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface IBudgetAndPMethods {
  pricePC: number;
  setPricePC(index: number): void;
  onContinue(clientSecret: string): void;
  ad?: AdPropsPrimitives;
}

export const BudgetAndPaymentMethod = (props: IBudgetAndPMethods) => {
  const { setPricePC, onContinue, pricePC, ad } = props;
  const { userStripe } = useUserStripe();
  const pmethods = userStripe.paymentMethods;
  const { state, dispatch } = useSetBudgetAndPM();

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {state.isCardPage ? (
          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold">Elije el método de pago</h3>
            <CreditCards
              paymentMethods={pmethods}
              onSelectedMethod={(method) => {
                if (!method) return;
                dispatch.setPaymentMethod(method);
              }}
            />
          </div>
        ) : (
          <Budgets
            pricePC={pricePC}
            onSelectBudget={(index) => {
              setPricePC(index);
            }}
          />
        )}
      </div>
      <div className="space-y-2">
        {state.isCardPage ? (
          <div className="space-y-2">
            <PaymentButtons
              adId={ad!.id}
              amountToPay={pricePC}
              pmethod={state.paymentMethod}
              onClientSecret={onContinue}
            />
          </div>
        ) : (
          <PrimaryButton type="button" onClick={() => dispatch.setIsCardPage()}>
            Continuar
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
