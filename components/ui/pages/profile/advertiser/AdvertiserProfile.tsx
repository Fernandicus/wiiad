import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ProfileDataSection } from "@/components/ui/pages/profile/advertiser/ProfileDataSection";
import { WalletDataSection } from "@/components/ui/pages/profile/advertiser/WalletDataSection";
import { useState } from "react";
import { AddCreditCardDialog } from "./items/AddCreditCardDialog";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserProfile({ user }: IAdvertiserSectionProps) {
  const { userStripe, setupIntentClientSecret } = useUserStripe();
  const [secret, setSecret] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="space-y-10">
        <ProfileDataSection user={user} />
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
    </div>
  );
}
