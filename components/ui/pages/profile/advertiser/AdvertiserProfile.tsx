import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ProfileDataSection } from "@/components/ui/pages/profile/advertiser/ProfileDataSection";
import { WalletDataSection } from "@/components/ui/pages/profile/advertiser/WalletDataSection";
import { useEffect, useState } from "react";
import { AddCreditCardDialog } from "./items/AddCreditCardDialog";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { SectionHeader } from "../../items/SectionHeader";
import { CardItem } from "./CardItem";
import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import { SecondaryNavBarItem } from "@/components/ui/layouts/navbar-items/SecondaryNavBarItem";
import { NavBarButton } from "@/components/ui/layouts/navbar-items/NavBarButton";
import Link from "next/link";
import { SecondaryNavBarButton } from "@/components/ui/layouts/navbar-items/SecondaryNavBarButton";
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
