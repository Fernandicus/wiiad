import { IProfilePageParams } from "@/pages/profile";
import { RoleType } from "@/src/common/domain/Role";
import { assertUnreachable } from "@/src/utils/helpers";
import { ReactElement } from "react";
import { PageLayout } from "../../layouts/PageLayout";
import { ScreenScreenPageLayout } from "../../layouts/ScreenPageLayout";
import { AdvertiserProfile } from "./advertiser/AdvertiserProfile";
import { UserProfile } from "./user/UserProfile";

export const ProfilePage = (props: IProfilePageParams) => {
  const { user } = props;
  const role = user.role as RoleType;

  const roleType = (roleT: RoleType) => {
    switch (roleT) {
      case RoleType.USER:
        return RoleType.USER;
      case RoleType.BUSINESS:
        return RoleType.BUSINESS;
      case RoleType.AGENCY:
        return RoleType.AGENCY;
      default:
        throw assertUnreachable(roleT);
    }
  };

  const profile: Record<RoleType, ReactElement | null> = {
    user: (
      <ScreenScreenPageLayout>
        <UserProfile user={user} />
      </ScreenScreenPageLayout>
    ),
    business: (
      <PageLayout>
        <AdvertiserProfile />
      </PageLayout>
    ),
    agency: null,
  };

  return profile[roleType(role)];
};
