import { BannerIcon } from "../../icons/BannerIcon";
import { VideoIcon } from "../../icons/VideoIcon";

interface ICreateAdOptions {
  onCreateBanner(): void;
  onCreateVideo(): void;
}

export const CreateAdOptions = ({
  onCreateBanner,
  onCreateVideo,
}: ICreateAdOptions) => {
  return (
    <div className="space-y-2 py-2 px-5 text-center text-sky-500">
      <button
        onClick={onCreateVideo}
        type="button"
        className="inline-flex items-center space-x-2 "
      >
        <div className="w-4 ">
          <VideoIcon />
        </div>
        <span>Video</span>
      </button>
      <hr className="border-sky-100" />
      <button
        onClick={onCreateBanner}
        type="button"
        className="inline-flex items-center space-x-2"
      >
        <div className="w-4 ">
          <BannerIcon />
        </div>
        <span>Banner</span>
      </button>
    </div>
  );
};
