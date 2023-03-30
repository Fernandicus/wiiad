import { Notification } from "../../notifications/Notification";
import AdView from "./AdView";

type AdViewPage = Parameters<typeof AdView>[0];

export const AdViewPage = (props: AdViewPage) => {
  const { ad, refereeValue, referrerProfile } = props;

  return (
    <>
      <AdView
        refereeValue={refereeValue}
        ad={ad}
        referrerProfile={referrerProfile}
      />
      <div className="fixed top-5 right-5">
        <Notification />
      </div>
    </>
  );
};
