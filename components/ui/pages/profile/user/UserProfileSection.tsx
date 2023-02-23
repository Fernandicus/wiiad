import { EditIcon } from "@/components/ui/icons/EditIcon";
import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
import { CardItem } from "@/components/ui/items/CardItem";
import { CristalCardItem } from "@/components/ui/items/CristalCardItem";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ReactElement } from "react";
import { UserDataProfile } from "./UserDataProfile";
import { DataCard } from "./items/DataCard";

interface Props {
  totalReferrers?: number;
  totalBalance?: number;
  campaignsWatched?: number;
  user: IUserPrimitives;
}

export const UserProfileSection = (props: Props) => {
  const { campaignsWatched, totalBalance, totalReferrers, user } = props;
  return (
    <div className="relative">
      <CristalCardItem>
        <div className="space-y-10">
          <div className="flex justify-center">
            <UserDataProfile user={user} />
          </div>
          <div className="flex justify-center space-x-5">
            <DataCard title="Dinero acumulado">
              {totalBalance || totalBalance == 0 ? (
                <p className="font-bold">{totalBalance.toFixed(2)}€</p>
              ) : (
                <div className="w-full h-6 flex justify-center items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                </div>
              )}
            </DataCard>
            <DataCard title="Anuncios vistos">
              {campaignsWatched || campaignsWatched == 0 ? (
                <p className="font-bold">{campaignsWatched.toString()}</p>
              ) : (
                <div className="w-full h-6 flex justify-center items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                </div>
              )}
            </DataCard>
            <DataCard title="Visitas a tu perfil">
            {totalReferrers || totalReferrers == 0 ? (
                <p className="font-bold">{totalReferrers.toString()}</p>
              ) : (
                <div className="w-full h-6 flex justify-center items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                </div>
              )}
            </DataCard>
          </div>
        </div>
        <button className="absolute top-3 right-3 text-sky-500">
          <div className="w-5 h-5">
            <EditIcon />
          </div>
        </button>
      </CristalCardItem>
    </div>
  );
};
