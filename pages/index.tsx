import { FormEvent, useRef, useState } from "react";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { SubmitFormController } from "@/components/src/common/infrastructure/controllers/SubmitFormController";
import { RoleType } from "@/src/common/domain/Role";

export default function Home(props: { session: IUserPrimitives }) {
  const myEmail = useRef<HTMLInputElement>(null);
  const myName = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState({ message: "", status: 200 });
  const [userRole, setRole] = useState<RoleType>(RoleType.USER);
  const [newAccount, setNewAccount] = useState<boolean>(false);

  const sumbitCreateNewUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = myEmail.current?.value;
    const userName = myName.current?.value;
    if (!email) return;
    const submitForm = new SubmitFormController();
    try {
      if (!newAccount)
        await submitForm.logIn({
          role: userRole,
          email,
        });
        
      await submitForm.singUp({
        role: userRole,
        email,
        userName: userName!,
      });

      setMessage({ status: 200, message: "Te hemos enviado un email" });
    } catch (err) {
      if (err instanceof Error)
        setMessage({ status: 500, message: err.message });
    }
  };

  const isUserRole = (): boolean => userRole === RoleType.USER;

  return (
    <div className=" h-screen bg-slate-50">
      <div className="absolute p-5 w-full">
        {message.status != 200 && message.message != "" ? (
          <div className="flex justify-end ">
            <h3 className=" bg-red-200 text-gray-900  border-l-8 border border-red-400 rounded-md shadow-lg p-5">
              {message.message}
            </h3>
          </div>
        ) : message.status == 200 && message.message != "" ? (
          <div className="flex justify-end ">
            <h3 className=" bg-lime-200 text-gray-700  border-l-8 border border-lime-400 rounded-md shadow-lg p-5">
              {message.message}
            </h3>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full max-w-lg mx-auto flex items-center h-full">
        <div className="space-y-20 w-full">
          <div className="border  rounded-lg p-14 space-y-10 bg-white shadow-2xl shadow-slate-200">
            <h1 className="text-center text-2xl font-bold text-gray-700">
              {isUserRole() ? (
                <span>
                  Bienvenido a <span className="text-sky-500">WiiAd</span>
                </span>
              ) : (
                <span>
                  <span className="text-sky-500">WiiAd</span> para anunciantes
                </span>
              )}
            </h1>

            <form className="space-y-10" onSubmit={sumbitCreateNewUser}>
              <div className=" space-y-6">
                <div className="">
                  {newAccount ? (
                    <div className="space-y-2 mb-4">
                      <label htmlFor="myName">
                        {isUserRole()
                          ? `Elige tu alias`
                          : "El nombre de tu marca"}
                      </label>
                      <input
                        ref={myName}
                        type="text"
                        placeholder={
                          isUserRole() ? `Paquito_Chocolatero` : "Coca-Cola"
                        }
                        className="border border-gray-300 rounded-md px-2 block w-full h-10"
                        required={newAccount ? true : undefined}
                      ></input>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="myEmail">Tu email</label>
                    <input
                      ref={myEmail}
                      type="email"
                      placeholder={
                        isUserRole()
                          ? `paco_jimenez@email.com`
                          : "info@coca-cola.com"
                      }
                      className="border border-gray-300 rounded-md px-2 block w-full h-10"
                      required
                    ></input>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  className="  bg-sky-500 text-white p-1 w-full h-10 rounded-md hover:bg-sky-400 transition ease-in duration-150"
                  type="submit"
                >
                  {newAccount
                    ? "Recibe tu email de confirmación"
                    : "Iniciar sesion"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    className="p-1 w-full h-10 text-sky-500  bg-sky-50 hover:bg-sky-100 transition ease-in duration-150 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(newAccount);
                      setNewAccount((newAccount) => !newAccount);
                    }}
                  >
                    {newAccount ? "Ya tengo cuenta" : "Crea una cuenta"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="space-x-2 w-full text-center">
            <button
              className=" text-sky-500"
              type="button"
              onClick={() => {
                console.log("USER ROLE ", isUserRole);
                if (!isUserRole()) setRole(RoleType.USER);
                else setRole(RoleType.BUSINESS);
              }}
            >
              {isUserRole() ? (
                <p>
                  <span className=" text-lg">📢 </span>Quiero anunciarme!
                </p>
              ) : (
                `Soy influencer!`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);
  if (session)
    return {
      props: {},
      redirect: {
        destination: `/${session.name}`,
      },
    };
  return {
    props: {
      session,
    },
  };
};
