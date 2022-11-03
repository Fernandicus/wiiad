import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useEffect, useState } from "react";
import { DataCard } from "./DataCard";
import { ProfileCard } from "./ProfileCard";

interface Props {
  user: IGenericUserPrimitives;
  children?: JSX.Element;
}

export function UserProfile({ user }: Props) {
  const [adsWatched, setAdsWatched] = useState<number>(0);

  /* const getAllAds = async () => {
    fetch(ApiRoutes.allAds).then(async (resp) => {
      console.log(" USER PROFILEE ");
      if (resp.status === 200) {
        const respJSON = await resp.json();
        console.log(respJSON);
        setAdsWatched(respJSON["ads"].length);
      }
    });
  };
  useEffect(() => {
    getAllAds();
  }, []); */

  return (
    <div className=" bg-slate-100 h-screen p-10 w-full ">
      <div className="flex justify-center h-full items-center">
        <div className="h-28 space-x-4 inline-flex items-center">
          <ProfileCard user={user} />
          <DataCard title="Dinero acumulado" data="3,75€" />
          <DataCard title="Anuncios vistos" data={adsWatched.toString()} />
          <DataCard title="Clicks en tus enlaces" data="533" />
        </div>
      </div>
    </div>
  );
}
