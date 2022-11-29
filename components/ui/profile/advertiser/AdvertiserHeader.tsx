import { DataCardButton } from "../user/DataCardButton";
import { IGenericUserPrimitives } from "@/src/domain/GenericUser";
import { DataCard } from "../user/DataCard";
import { ProfileCard } from "../user/ProfileCard";

interface Props {
  user: IGenericUserPrimitives;
  totalAds:number;
  totalCampaigns:number;
  children?: JSX.Element;
}

export function AdvertiserHeader({ user, totalAds, totalCampaigns }: Props) {
  return (

      <div className="flex justify-center h-full items-center">
        <div className="h-28 space-x-4 inline-flex items-center">
          <ProfileCard user={user} />
          <DataCardButton href={`/ads`} title="Anuncios" data={totalAds.toString()} />
          <DataCardButton href={`/campaigns`} title="Campañas" data={totalCampaigns.toString()} />
        </div>
      </div>
  );
}
