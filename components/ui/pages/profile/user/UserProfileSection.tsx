import { EditIcon } from "@/components/ui/icons/EditIcon";
import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";
import { CardItem } from "@/components/ui/items/CardItem";
import { CristalCardItem } from "@/components/ui/items/CristalCardItem";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ReactElement } from "react";
import { UserDataProfile } from "./UserDataProfile";
import { DataCard } from "./items/DataCard";
import { InterestBox } from "./items/InterestsBox";
import { EditButton } from "../../../buttons/EditButton";

interface Props {
  totalReferrers?: number;
  totalBalance?: number;
  campaignsWatched?: number;
  user: IUserPrimitives;
  onEditButton():void;
}

export const UserProfileSection = (props: Props) => {
  const {onEditButton, campaignsWatched, totalBalance, totalReferrers, user } = props;
  return (
    <div className="relative max-w-2xl">
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
                <p className="font-bold">{4}</p>
              ) : (
                <div className="w-full h-6 flex justify-center items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                </div>
              )}
            </DataCard>
            <DataCard title="Anuncios referidos">
              {totalReferrers || totalReferrers == 0 ? (
                <p className="font-bold">{1}</p>
              ) : (
                <div className="w-full h-6 flex justify-center items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                </div>
              )}
            </DataCard>
          </div>

          <InterestBox
            interests={[
              "tecnología",
              "salud",
              "finanzas",
              "economía",
              "fitness",
            ]}
          />
        </div>
        <div className="absolute top-5 right-5">
          <EditButton onClick={onEditButton} />
        </div>
      </CristalCardItem>
    </div>
  );
};
