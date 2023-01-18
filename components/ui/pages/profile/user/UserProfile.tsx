import { Logout } from "../../../login/Logout";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useEffect, useState } from "react";
import { DataCard } from "./DataCard";
import { ProfileCard } from "./ProfileCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

interface Props {
  user: IUserPrimitives;
  children?: JSX.Element;
}

export function UserProfile({ user }: Props) {
  const [totalReferrers, setReferrers] = useState<number>();
  const [totalBalance, setBalance] = useState<number>();
  const [campaignsWatched, setCampaignsWatched] = useState<number>();

  const getReferrals = async () => {
    fetch(ApiRoutes.getUserReferralData).then(async (resp) => {
      if (resp.status === 200) {
        const respJSON = await resp.json();
        console.log(respJSON);

        setReferrers(respJSON["referral"]["referrers"]);
        const referrerBalance = respJSON["referral"]["referrerBalance"];
        const refereeBalance = respJSON["referral"]["refereeBalance"];
        const total = referrerBalance + refereeBalance;
        setBalance(total);
        const campaignsWatched = respJSON["referral"]["referees"];
        setCampaignsWatched(campaignsWatched);
      }
    });
  };

  useEffect(() => {
    getReferrals();
  }, []);

  return (
    <div className="flex justify-center h-full items-center">
      <div className="h-28 space-x-4 inline-flex items-center">
        <ProfileCard user={user} />
        <DataCard
          title="Dinero acumulado"
          data={totalBalance ? (totalBalance / 100).toString() + "€" : "0"}
        />
        <DataCard
          title="Anuncios vistos"
          data={campaignsWatched ? campaignsWatched.toString() : "0"}
        />
        <DataCard
          title="Clicks en tus enlaces"
          data={totalReferrers ? totalReferrers.toString() : "0"}
        />
      </div>
    </div>
  );
}
