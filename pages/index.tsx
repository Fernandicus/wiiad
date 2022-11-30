import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RoleType } from "@/src/domain/Role";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { GetServerSideProps } from "next";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { APISendEmailVerification } from "./api/v1/auth/login";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { Notifications } from "../components/ui/notifications/Notifications";

export default function Home(props: { session: AdvertiserPropsPrimitives }) {
  const myEmail = useRef<HTMLInputElement>(null);
  const myName = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState({ message: "", status: 0 });
  const [isUserRole, setRole] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const sumbitNewUserForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valueEmail = myEmail.current?.value;
    const valueName = myName.current?.value;

    const resp = await fetch(ApiRoutes.login, {
      method: "POST",
      body: JSON.stringify({
        isNewUser,
        data: {
          email: valueEmail,
          userName: valueName,
          role: isUserRole ? RoleType.USER : RoleType.BUSINESS,
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
      setMessage({
        status: 0,
        message: "Te hemos enviado un email de confirmacion",
      });
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
              {isUserRole ? (
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
                        {isUserRole
                          ? `Elige tu alias`
                          : "El nombre de tu marca"}
                      </label>
                      <input
                        ref={myName}
                        type="text"
                        placeholder={
                          isUserRole ? `Paquito_Chocolatero` : "Coca-Cola"
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
                        isUserRole
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
                  {isNewUser
                    ? "Recibe tu email de confirmación"
                    : "Iniciar sesion"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    className="p-1 w-full h-10 text-sky-500  bg-sky-50 hover:bg-sky-100 transition ease-in duration-150 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(isNewUser);
                      setIsNewUser((isNewUser) => !isNewUser);
                    }}
                  >
                    {isNewUser ? "Ya tengo cuenta" : "Crea una cuenta"}
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
                setRole(!isUserRole);
              }}
            >
              {isUserRole ? (
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
