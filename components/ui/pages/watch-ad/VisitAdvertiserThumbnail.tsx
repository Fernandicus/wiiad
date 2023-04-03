import Link from "next/link";
import { TertiaryButton } from "../../buttons/TertiaryButton";
import { WatchAdDisplayCover } from "./items/WatchAdDisplayCover";

interface VisitAdvertiserThumbnailProps {
  adDescription: string;
  adRedirectionUrl: string;
  onMonetizeAd(): void;
}

export const VisitAdvertiserThumbnail = (
  props: VisitAdvertiserThumbnailProps
) => {
  const { adDescription, adRedirectionUrl, onMonetizeAd } = props;
  return (
    <WatchAdDisplayCover>
      <div className=" space-y-10">
        <div className="px-5">
          <p className=" text-slate-600">{adDescription}</p>
        </div>
        <div className="space-y-5 text-center">
          <div>
            <Link
              onClick={onMonetizeAd}
              href={adRedirectionUrl}
              passHref
              target="_blank"
            >
              <div className="hover:cursor-pointer inline-block p-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md">
                Monetizar y visitar web
              </div>
            </Link>
          </div>

          <TertiaryButton type="button" onClick={onMonetizeAd}>
            <p className="text-sm">Monetizar</p>
          </TertiaryButton>
        </div>
      </div>
    </WatchAdDisplayCover>
  );
};
