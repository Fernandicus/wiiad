import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { useRef, useState } from "react";
import { RolType } from "@/src/domain/Rol";

export default function Home() {
  const myEmail = useRef<HTMLInputElement>(null);
  const myName = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState({ message: "", status: 0 });

  return (
    <div className={styles.container}>
      {message.status != 0 ? (
        <h3 className="errorLogin">{message.message}</h3>
      ) : message.message !== "" ? (
        <h3 className="successLogin">{message.message}</h3>
      ) : (
        <div></div>
      )}
      <h1>LOGIN or SIGNUP</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const valueEmail = myEmail.current?.value;
          const valueName = myName.current?.value;
          const resp = await fetch("/api/mailing/send-email-verification", {
            method: "POST",
            body: JSON.stringify({
              email: valueEmail,
              userName: valueName,
              rol: RolType.BUSINESS,
            }),
          });
          const jsonResp = await resp.json();
          console.log(resp);
          if (resp.status === 400 || resp.status === 500) {
            const message =
              jsonResp.message !== ""
                ? jsonResp.message
                : "Something wnet wrong";
            setMessage({ status: resp.status, message });
          } else {
            setMessage({ status: 0, message: "Review your Email" });
          }
        }}
      >
        <label htmlFor="myEmail">EMAIL</label>
        <br />
        <input ref={myEmail} type="email" placeholder="Your email"></input>
        <br />
        <br />
        <label htmlFor="myEmail">NAME</label>
        <br />
        <input ref={myName} type="text" placeholder="Your NAME"></input>
        <br />
        <br />
        <br />
        <button className="loginButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
