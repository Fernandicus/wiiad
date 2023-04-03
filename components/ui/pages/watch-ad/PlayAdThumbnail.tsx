import { PrimaryButton } from "../../buttons/PrimaryButton";
import { PlayIcon } from "../../icons/PlayIcon";
import { ReferrerProfile } from "./items/ReferrerProfile";
import { WatchAdDisplayCover } from "./items/WatchAdDisplayCover";

type WatchAdThumbnailProps = Parameters<typeof ReferrerProfile>[0] & {
  onWatchAd(): void;
};

export const PlayAdThumbnail = (props: WatchAdThumbnailProps) => {
  const { referrerName, referrerProfilePic, onWatchAd } = props;
  return (
    <WatchAdDisplayCover>
      <div className="text-center space-y-5 ">
        <ReferrerProfile
          referrerName={referrerName}
          referrerProfilePic={referrerProfilePic}
        />

        <div className="flex items-center ">
          <div className="space-y-5">
            <p className="font-semibold">Gana 0.05€ viendo este anuncio</p>
            <PrimaryButton onClick={onWatchAd} fullWitdth={false} type="button">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5">
                  <PlayIcon />
                </div>
                <p>Ver anuncio</p>
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </WatchAdDisplayCover>
  );
};
