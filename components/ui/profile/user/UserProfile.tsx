import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { DataCard } from "./DataCard";
import { ProfileCard } from "./ProfileCard";

interface Props {
  user: IGenericUserPrimitives;
  children?: JSX.Element;
}

export function UserProfile({ user }: Props) {
  return (
    <div className=" bg-slate-100 h-screen p-10 w-full ">
      <div className="flex justify-center h-full items-center">
        <div className="h-28 space-x-4 inline-flex items-center">
          <ProfileCard user={user} />
          <DataCard title="Dinero acumulado" data="3,75€" />
          <DataCard title="Anuncios vistos" data="155" />
          <DataCard title="Clicks en tus enlaces" data="533" />
        </div>
      </div>
    </div>
  );
}
