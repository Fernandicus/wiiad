import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { BackButtonIcon } from "../../icons/BackButtonIcon";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import CreateAdForm from "./CreateAdForm";

interface ICreateAdSectionProps {
  user: IUserPrimitives;
  adType: AdType;
  onBack(): void;
  handleResponse(data: NotificationData): void;
}

export default function CreateAdSection(props: ICreateAdSectionProps) {
  const { adType, handleResponse, onBack, user } = props;
  return (
    <div className=" w-full flex justify-center">
      <div className="max-w-xl py-10">
        <div className="pb-5">
          <button onClick={onBack} className="w-6 h-auto hover:text-sky-500">
            <BackButtonIcon />
          </button>
          <div className="font-bold text-xl">Crea tu anuncio</div>
          <CreateAdForm
            adType={adType}
            handleResponse={handleResponse}
            onSuccess={onBack}
          />
        </div>
      </div>
    </div>
  );
}
