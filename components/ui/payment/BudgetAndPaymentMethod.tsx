import { CreditCards } from "./CreditCards";
import { Budgets } from "./Budgets";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useSetBudgetAndPM } from "./hooks/useSetBudgetAndPM";
import { PaymentButtons } from "./PaymentButtons";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";

interface IBudgetAndPMethods {
  onContinue(clientSecret: string): void;
}

export const BudgetAndPaymentMethod = (props: IBudgetAndPMethods) => {
  const { onContinue } = props;
  const { userStripe } = useUserStripe();
  const pmethods = userStripe.paymentMethods;
  const { state, dispatch } = useSetBudgetAndPM();

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {state.isCardPage ? (
          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold">Elije un método de pago</h3>
            <CreditCards paymentMethods={pmethods} />
          </div>
        ) : (
          <Budgets />
        )}
      </div>
      <div className="space-y-2">
        {state.isCardPage ? (
          <div className="space-y-2">
            <PaymentButtons onClientSecret={onContinue} />
          </div>
        ) : (
          <PrimaryButton
            type="button"
            onClick={() => {
              dispatch.setIsCardPage();
            }}
          >
            Continuar
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
