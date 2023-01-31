import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { NotificationData } from "../../notifications/Notifications";
import { AdSectionHeader } from "./AdSectionHeader";
import { AdsListSection } from "./AdsListSection";

interface IAdsSection {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  handleResponse(data: NotificationData): void;
  onCreateBanner(): void;
  onCreateVideo(): void;
}

export const AdsSections = (props: IAdsSection) => {
  const { handleResponse, onLaunchCampaign, onCreateBanner, onCreateVideo } =
    props;
  return (
    <div>
      <AdSectionHeader
        titleLabel="Tus anuncios"
        descriptionLabel="Crea y lanza anuncios de tipo video o banner"
        onCreateVideo={onCreateVideo}
        onCreateBanner={onCreateBanner}
      />
      <AdsListSection
        handleResponse={handleResponse}
        onLaunchCampaign={onLaunchCampaign}
      />
    </div>
  );
};
