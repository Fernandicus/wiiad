import { AdType } from "@/pages/ads";
import CreateAdForm from "./CreateAdForm";
import { SectionHeader } from "../items/SectionHeader";

interface ICreateAdSectionProps {
  adType: AdType;
  onBack(): void;
}

export default function CreateAdSection(props: ICreateAdSectionProps) {
  const { adType, onBack } = props;
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
          onSuccess={onBack}
        />
      </div>
    </div>
  );
}
