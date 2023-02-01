import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdSectionHeader } from "./AdSectionHeader";
import { AdsListSection } from "./AdsListSection";

interface IAdsSection {
  onLaunchCampaign(ad: AdPropsPrimitives): void;
  onCreateBanner(): void;
  onCreateVideo(): void;
}

export const AdsSections = (props: IAdsSection) => {
  const { onLaunchCampaign, onCreateBanner, onCreateVideo } =
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
        onLaunchCampaign={onLaunchCampaign}
      />
    </div>
  );
};
