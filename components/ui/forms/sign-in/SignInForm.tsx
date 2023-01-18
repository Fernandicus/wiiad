import { SubmitSignInController } from "@/components/src/modules/sing-in/infrastructure/controllers/SubmitSignInController";
import { RoleType } from "@/src/common/domain/Role";
import { FormEvent, useRef, useState } from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { SecondaryButton } from "../../buttons/SecondaryButton";

enum Loader {
  isLoading,
  notLoading,
}

export const SignInForm = (params: {
  userRole: RoleType;
  logIn: boolean;
  onSuccess(): void;
  onError(error: Error): void;
}) => {
  const { userRole, logIn, onSuccess, onError } = params;
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [isNewAccount, setNewAccount] = useState<boolean>(logIn);
  const [isLoading, setLoader] = useState<boolean>(false);

  const primaryButtonLabel = isNewAccount
    ? "Recibe tu email de confirmación"
    : "Iniciar sesion";
  const secondaryButtonLabel = isNewAccount
    ? "Ya tengo cuenta"
    : "Crea una cuenta";
  const isUserRole = userRole === RoleType.USER;
  const nameInputLabel = isUserRole ? `Elige tu alias` : "Tu marca";
  const emailPlaceHolder = isUserRole
    ? `paco_jimenez@email.com`
    : "info@coca-cola.com";
  const namePlaceHolder = isUserRole ? `Paquito_Chocolatero` : "Coca-Cola";
  const switcher = () => setNewAccount((isNewAccount) => !isNewAccount);

  const signIn = async (
    isNewAccount: boolean,
    data: { role: RoleType; email: string; userName?: string }
  ): Promise<void> => {
    const { email, role, userName } = data;
    const submitForm = new SubmitSignInController();
    if (isNewAccount)
      await submitForm.singUp({
        role,
        email,
        userName: userName!,
      });
    else
      await submitForm.logIn({
        role,
        email,
      });
  };

  const sumbitCreateNewUser = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;
    const email = emailRef.current?.value;
    const userName = userNameRef.current?.value;
    if (!email) return;
    try {
      setLoader(true);
      await signIn(isNewAccount, { role: userRole, userName, email });
      setLoader(false);
      onSuccess();
    } catch (err) {
      setLoader(false);
      if (err instanceof Error) onError(err);
    }
  };

  return (
    <form className="space-y-10" onSubmit={sumbitCreateNewUser}>
      <div className=" space-y-6">
        <div className="">
          {isNewAccount ? (
            <div className="space-y-2 mb-4">
              <label htmlFor="myName">{nameInputLabel}</label>
              <input
                ref={userNameRef}
                type="text"
                placeholder={namePlaceHolder}
                className="border border-gray-300 rounded-md px-2 block w-full h-10"
                required={isNewAccount ? true : undefined}
              ></input>
            </div>
          ) : (
            <div></div>
          )}
          <div className="space-y-2">
            <label htmlFor="myEmail">Tu email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder={emailPlaceHolder}
              className="border border-gray-300 rounded-md px-2 block w-full h-10"
              required
            ></input>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <PrimaryButton isLoading={isLoading} type="submit">
          {primaryButtonLabel}
        </PrimaryButton>
        <div className="text-center">
          <SecondaryButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              switcher();
            }}
          >
            {secondaryButtonLabel}
          </SecondaryButton>
        </div>
      </div>
    </form>
  );
};
