import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { BackIcon } from "../../icons/BackIcon";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import CreateAdForm from "./CreateAdForm";
import { SectionHeader } from "../items/SectionHeader";

interface ICreateAdSectionProps {
  user: IUserPrimitives;
  adType: AdType;
  onBack(): void;
  handleResponse(data: NotificationData): void;
}

export default function CreateAdSection(props: ICreateAdSectionProps) {
  const { adType, handleResponse, onBack, user } = props;
  return (
    <div className="max-w-xl mx-auto">
      <SectionHeader
        onBack={onBack}
        titleLable="Crea un anuncio"
        descriptionLabel="Completa los campos para crear un anuncio"
      />
      <div className="w-full flex justify-center">
        <CreateAdForm
          adType={adType}
          handleResponse={handleResponse}
          onSuccess={onBack}
        />
      </div>
    </div>
  );
}
