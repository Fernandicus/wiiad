import { DataCardButton } from "../user/DataCardButton";
import { ProfileCard } from "../user/ProfileCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useEffect } from "react";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
import { useCampaigns } from "@/components/hooks/campaigns/useCampaigns";

interface IAdvertiserSectionProps {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function AdvertiserHeader({ user }: IAdvertiserSectionProps) {
  const {init, campaigns, status } = useCampaigns();

  async function getAds(): Promise<void> {
    const resp = await fetch(ApiRoutes.advertiserAds, { method: "GET" });
    if (resp.status !== 200)
      throw new Error("Something went wrong getting campaigns");
    const respJSON = await resp.json();
    const advertise = respJSON["ads"];
    //setAds(advertise);
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <div className="flex justify-center h-full items-center">
      <div className="h-28 space-x-4 inline-flex items-center">
        <ProfileCard user={user} />
        <DataCardButton href={`/ads`} title="Anuncios"></DataCardButton>
        <DataCardButton href={`/campaigns`} title="Campañas">
          {status === "non-init" ? (
            <div className="h-full flex justify-center items-center">
              <div className="text-sky-500 w-6">
                <LoadingSpinnerAnimation strokeWith={2} />
              </div>
            </div>
          ) : (
            <p className="font-bold group-hover:text-sky-500">
              {campaigns.length}
            </p>
          )}
        </DataCardButton>
      </div>
    </div>
  );
}
