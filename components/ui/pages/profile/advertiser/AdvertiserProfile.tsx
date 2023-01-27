import { ProfileCard } from "../ProfileCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { LoadDataCardButton } from "./items/LoadDataCardButton";
import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useCampaigns } from "@/components/hooks/advertiser/campaigns/useCampaigns";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserProfile({ user }: IAdvertiserSectionProps) {
  const { status } = useAdvertiser();
  const { campaigns } = useCampaigns();
  const { ads } = useAds();
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
          data={campaigns.all}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
