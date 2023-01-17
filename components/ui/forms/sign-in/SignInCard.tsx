import { RoleType } from "@/src/common/domain/Role";
import { SignInForm } from "./SignInForm";

export const SignInCard = (params: {
  logIn: boolean;
  userRole: RoleType;
  onSuccessSubmit(): void;
  onErrorSubmit(error: Error): void;
}) => {
  const { onErrorSubmit, onSuccessSubmit, userRole, logIn } = params;
  const isUserRole = userRole === RoleType.USER;
  const title = isUserRole ? (
    <span>
      Bienvenido a <span className="text-sky-500">WiiAd</span>
    </span>
  ) : (
    <span>
      <span className="text-sky-500">WiiAd</span> para anunciantes
    </span>
  );

  return (
    <div className="border  rounded-lg p-14 space-y-10 bg-white shadow-2xl shadow-slate-200">
      <h1 className="text-center text-2xl font-bold text-gray-700">{title}</h1>
      <SignInForm
        userRole={userRole}
        logIn={logIn}
        onSuccess={onSuccessSubmit}
        onError={onErrorSubmit}
      ></SignInForm>
    </div>
  );
};
