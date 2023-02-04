import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { ProfileDataSection } from "@/components/ui/pages/profile/advertiser/ProfileDataSection";
import { WalletDataSection } from "@/components/ui/pages/profile/advertiser/WalletDataSection";
import { SectionHeader } from "../../items/SectionHeader";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserProfile({ user }: IAdvertiserSectionProps) {
  const { userStripe } = useUserStripe();

  return (
    <div className="space-y-10 ">
      <ProfileDataSection user={user} />
      <WalletDataSection paymentMethods={userStripe.paymentMethods} />
      <SectionHeader
        titleLable="Historial"
        descriptionLabel="Un historial con todas las campañas lanzadas"
      ></SectionHeader>
    </div>
  );
}
