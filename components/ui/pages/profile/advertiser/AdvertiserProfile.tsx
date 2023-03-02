
import { useEffect, useState } from "react";
import {
  ProfileSecondaryNavBar,
  TProfileSeconadaryNavBar,
} from "./ProfileSecondaryNavBar";
import { AdvertiserProfileSection } from "./AdvertiserProfileSection";
import { FacturationProfileSection } from "./FacturationProfileSection";
import { useRouter } from "next/router";

export function AdvertiserProfile() {
  const router = useRouter();
  const [secondaryPage, setSecondaryPage] =
    useState<TProfileSeconadaryNavBar>("profile");

  useEffect(() => {
    const paths = router.asPath.split("#");
    const subPage = paths[1] as TProfileSeconadaryNavBar;
    setSecondaryPage(subPage);
  }, []);

  return (
    <>
      <ProfileSecondaryNavBar
        selectedPage={secondaryPage}
        onClick={(page) => setSecondaryPage(page)}
      />
      <div>
        {secondaryPage == "facturation" ? (
          <FacturationProfileSection />
        ) : (
          <AdvertiserProfileSection />
          )}
      </div>
    </>
  );
}
