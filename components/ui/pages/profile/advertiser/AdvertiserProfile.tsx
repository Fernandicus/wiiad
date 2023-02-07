import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { ProfileDataSection } from "@/components/ui/pages/profile/advertiser/ProfileDataSection";
import { WalletDataSection } from "@/components/ui/pages/profile/advertiser/WalletDataSection";
import { SectionHeader } from "../../items/SectionHeader";
import { useState } from "react";
import StripePaymentElement from "@/components/ui/payment/StripePaymentElement";
import { useNotification } from "@/components/ui/notifications/hooks/useNotification";
import { CloudConfig } from "@cloudinary/url-gen";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserProfile({ user }: IAdvertiserSectionProps) {
  const { userStripe } = useUserStripe();
  const [setupIntent, setSetupIntent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [secret, setSecret] = useState<string>("");
  const { confirmSetupIntent } = useUserStripe();
  const { setNotification } = useNotification();

  return (
    <div className="space-y-10">
      <ProfileDataSection user={user} />
      <WalletDataSection
        onAddPaymentMethod={(secret) => {
          setSecret(secret);
          console.log(secret);
          setSetupIntent(true);
        }}
        paymentMethods={userStripe.paymentMethods}
      />
      {setupIntent && (
        <div className="fixed max-w-5xl inset-0 mx-auto h-screen ">
          <div className="flex items-center justify-center bg-slate-100/80 h-screen w-full">
            <div className="bg-white p-5 shadow-slate-300 shadow-xl rounded-lg">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
