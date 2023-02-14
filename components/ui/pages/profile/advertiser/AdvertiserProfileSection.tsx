import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { useState } from "react";
import { AddCreditCardDialog } from "./items/AddCreditCardDialog";
import { ProfileDataSection } from "./ProfileDataSection";
import { WalletDataSection } from "./WalletDataSection";

export const AdvertiserProfileSection = () => {
  const { userStripe, setupIntentClientSecret } = useUserStripe();
  const { session } = useAdvertiser();
  const [secret, setSecret] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <>
      <div className="space-y-10">
        <ProfileDataSection user={session} />
        <WalletDataSection
          onAddPaymentMethod={async (e) => {
            e.preventDefault();
            try {
              setShowDialog((prev) => !prev);
              const secret = await setupIntentClientSecret();
              setSecret(secret);
            } catch (err) {
              console.error(err);
            }
          }}
          paymentMethods={userStripe.paymentMethods}
        />
      </div>
      {showDialog && (
        <AddCreditCardDialog
          closeDialog={() => setShowDialog(false)}
          secret={secret}
        />
      )}
    </>
  );
};
