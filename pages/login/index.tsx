import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RolType } from "@/src/domain/Rol";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps } from "next";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { APISendEmailVerification } from "../api/v1/mailing/send-email-verification";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { Notifications } from "../../components/ui/notifications/Notifications";

export default function Home(props: { session: AdvertiserPropsPrimitives }) {
  const myEmail = useRef<HTMLInputElement>(null);
  const myName = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState({ message: "", status: 0 });
  const [isUserRol, setRol] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  const sumbitNewUserForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valueEmail = myEmail.current?.value;
    const valueName = myName.current?.value;

    const resp = await fetch(ApiRoutes.sendVerificationEmail, {
      method: "POST",
      body: JSON.stringify({
        isNewUser,
        data: {
          email: valueEmail,
          userName: valueName,
          rol: isUserRol ? RolType.USER : RolType.BUSINESS,
        },
      }),
    });
    const jsonResp = await resp.json();
    console.log(resp);
    if (resp.status === 400 || resp.status === 500) {
      const message =
        jsonResp.message !== "" ? jsonResp.message : `Algo ha ido mal :(`;
      setMessage({ status: resp.status, message });
    } else {
      setMessage({ status: 0, message: "Te hemos enviado un email!" });
    }
  };

  return (
    <div className=" h-screen bg-slate-50">
      <div className="absolute p-5 w-full">
        {message.status != 0 && message.message != "" ? (
          <div className="flex justify-end ">
            <h3 className=" bg-red-200 text-gray-900  border-l-8 border border-red-400 rounded-md shadow-lg p-5">
              {message.message}
            </h3>
          </div>
        ) : message.status == 0 && message.message != "" ? (
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
              {isUserRol ? (
                <span>
                  Bienvenido a <span className="text-sky-500">WiiAd</span>
                </span>
              ) : (
                <span>
                  <span className="text-sky-500">WiiAd</span> para anunciantes
                </span>
              )}
            </h1>

            <form className="space-y-10" onSubmit={sumbitNewUserForm}>
              <div className=" space-y-6">
                <div className="">
                  {isNewUser ? (
                    <div className="space-y-2 mb-4">
                      <label htmlFor="myName">
                        {isUserRol ? `Elige tu mote!` : "El nombre de tu marca"}
                      </label>
                      <input
                        ref={myName}
                        type="text"
                        placeholder={
                          isUserRol ? `Paquito_Chocolatero` : "Coca-Cola"
                        }
                        className="border border-gray-300 rounded-md px-2 block w-full h-10"
                        required={isNewUser ? true : undefined}
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
                        isUserRol
                          ? `paco_jimenez@email.com`
                          : "info@coca-cola.com"
                      }
                      className="border border-gray-300 rounded-md px-2 block w-full h-10"
                      required
                    ></input>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <button
                  className="  bg-sky-600 text-white p-1 w-full h-10 rounded-md"
                  type="submit"
                >
                  {isNewUser
                    ? "Recibe tu email de confirmación"
                    : "Iniciar sesion"}
                </button>
                <div className="text-center">
                  {isNewUser ? (
                    <p className="text-sm text-center">
                      <button
                        type="button"
                        className=" text-sky-500 "
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(isNewUser);
                          setIsNewUser(!isNewUser);
                        }}
                      >
                        Ya tengo cuenta
                      </button>
                    </p>
                  ) : (
                    <p className="text-sm text-center">
                      ¿No tienes cuenta?{" "}
                      <button
                        type="button"
                        className=" text-sky-500 "
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(isNewUser);
                          setIsNewUser((isNewUser) => !isNewUser);
                        }}
                      >
                        Crea tu cuenta aquí
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="space-x-2 w-full text-center">
            <button
              className=" text-sky-500"
              type="button"
              onClick={() => {
                console.log("USER ROL ", isUserRol);
                setRol(!isUserRol);
              }}
            >
              {isUserRol ? (
                <p>
                  <span className=" text-lg">🙀 </span>Quiero anunciarme!
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
