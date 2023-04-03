import { SubmitSignInController } from "@/components/src/sing-in/infrastructure/controllers/SubmitSignInController";
import { RoleType } from "@/src/common/domain/Role";
import { FormEvent, useRef, useState } from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { useSignInForm } from "../hooks/useSignInForm";
import { replaceInputTextSpacesWith } from "@/src/utils/helpers";

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

  const { input, handle } = useSignInForm({
    isNewAccount,
    onError,
    onSuccess,
    userRole,
  });

  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        handle.submit(e, {});
      }}
    >
      <div className=" space-y-6">
        <div className="">
          {isNewAccount ? (
            <div className="space-y-2 mb-4">
              <label htmlFor="myName">{nameInputLabel}</label>
              <input
                name={input.names.userName}
                value={input.values.userName}
                onChange={(e) => {
                  e.target.value = replaceInputTextSpacesWith(e, "_");
                  handle.change(e);
                }}
                // ref={userNameRef}
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
              //ref={emailRef}
              name={input.names.email}
              value={input.values.email}
              onChange={(e) => {
                e.target.value = replaceInputTextSpacesWith(e, "_");
                handle.change(e);
              }}
              type="text"
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
