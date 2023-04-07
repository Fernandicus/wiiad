import { useNotification } from "@/components/hooks/useNotification";
import { RoleType } from "@/src/common/domain/Role";
import { useState } from "react";
import { ScreenPageLayout } from "../../layouts/ScreenPageLayout";
import { SignInCard } from "../../forms/sign-in/SignInCard";
import { TertiaryButton } from "../../buttons/TertiaryButton";

export const SignInPage = ()=>{
    const [userRole, setRole] = useState<RoleType>(RoleType.USER);
  const { setNotification } = useNotification();

  const isUserRole = userRole === RoleType.USER;
  const tertiaryButtonLabel = isUserRole
    ? "Quiero anunciarme!"
    : `Soy influencer!`;

    return <ScreenPageLayout>
    <div className="space-y-20 w-full max-w-lg mx-auto">
      <SignInCard
        logIn
        userRole={userRole}
        onErrorSubmit={(err) => {
          setNotification({
            message: err.message as string,
            status: "error",
          });
        }}
        onSuccessSubmit={() => {
          setNotification({
            message: "Te hemos enviado un email",
            status: "success",
          });
        }}
      />
      <div className="space-x-2 w-full text-center">
        <TertiaryButton
          type="button"
          onClick={() => {
            if (!isUserRole) setRole(RoleType.USER);
            else setRole(RoleType.BUSINESS);
          }}
        >
          {tertiaryButtonLabel}
        </TertiaryButton>
      </div>
    </div>
</ScreenPageLayout>
}