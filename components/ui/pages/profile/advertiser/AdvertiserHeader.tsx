import { DataCardButton } from "../user/DataCardButton";
import { ProfileCard } from "../user/ProfileCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useEffect } from "react";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { LoadDataCardButton } from "../user/LoadDataCardButton";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserHeader({ user }: IAdvertiserSectionProps) {
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
