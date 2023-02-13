import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
import { useNotification } from "@/components/hooks/useNotification";
import StripePaymentElement from "@/components/ui/payment/StripePaymentElement";
import { useState } from "react";

interface AddCreditCardDialogProps {
  secret: string;
  closeDialog(): void;
}

export const AddCreditCardDialog = ({
  secret,
  closeDialog,
}: AddCreditCardDialogProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { confirmSetupIntent } = useUserStripe();
  const { setNotification } = useNotification();

  return (
    <div className="absolute inset-0 mx-auto bg-slate-100/80">
      <div className="relative h-full w-full flex items-center justify-center ">
        <div className="bg-white p-5 shadow-slate-300 shadow-xl rounded-lg space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Añade una tarjeta</h3>
            <button
              onClick={closeDialog}
              className="text-gray-600 stroke-2 h-6 w-6"
            >
              <CloseIcon />
            </button>
          </div>
          {!secret ? (
            <div className="w-5 h-5">
              <LoadingSpinnerAnimation />
            </div>
          ) : (
            <StripePaymentElement
              clientSecret={secret}
              buttonLabel="Guardar tarjeta"
              onSubmit={async ({ elements, stripe }) => {
                if (isSending) return;
                setIsSending(true);
                try {
                  await confirmSetupIntent({
                    useElements: elements,
                    useStripe: stripe,
                  });
                  setNotification({
                    message: "Tarjeta gaurdada",
                    status: "success",
                  });
                  setIsSending(false);
                } catch (err) {
                  setIsSending(false);
                  console.error(err);
                  if (err instanceof Error)
                    setNotification({
                      message: "No se pudo guardar la tarjeta",
                      status: "error",
                    });
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
