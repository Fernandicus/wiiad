import { ProfileCard } from "../ProfileCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { LoadDataCardButton } from "./items/LoadDataCardButton";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserProfile({ user }: IAdvertiserSectionProps) {
  const { ads, campaigns, status } = useAdvertiser();
  const isLoading = status === "non-init";

  return (
    <div className="flex justify-center h-full items-center">
      <div className="h-28 space-x-4 inline-flex items-center">
        <ProfileCard user={user} />
        <LoadDataCardButton
          title="Anuncios"
          redirection="/ads"
          data={ads}
          isLoading={isLoading}
        />
        <LoadDataCardButton
          title="Campañas"
          redirection="/campaigns"
          data={campaigns}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
