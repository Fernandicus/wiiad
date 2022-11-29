import { Logout } from "../../login/Logout";
import { IGenericUserPrimitives } from "@/src/domain/GenericUser";
import { RoleType } from "@/src/domain/Role";
import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataCard } from "./DataCard";
import { ProfileCard } from "./ProfileCard";

interface Props {
  user: IGenericUserPrimitives;
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
    <div className=" bg-slate-100 h-screen p-10 w-full ">
      <Logout />
      <div className="flex justify-center h-full items-center">
        <div className="h-28 space-x-4 inline-flex items-center">
          <ProfileCard user={user} />
          <DataCard
            title="Dinero acumulado"
            data={totalBalance ? (totalBalance/100).toString()+'€' : "0"}
          />
          <DataCard
            title="Anuncios vistos"
            data={campaignsWatched ? campaignsWatched.toString() : "0"}
          />
          <DataCard
            title="Clicks en tus enlaces"
            data={ totalReferrers ? totalReferrers.toString() : "0"}
          />
        </div>
      </div>
    </div>
  );
}
