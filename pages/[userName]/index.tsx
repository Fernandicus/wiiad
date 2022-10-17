import { ValidateLoginQueries } from "@/src/domain/ValidateLoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LogInController } from "@/src/controllers/LogInController";
import { IUser } from "@/src/domain/IUser";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { userSession } from "@/src/use-case/container";
import { useEffect, useRef, useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const user: IUser = props.user;

  const [totalAds, setTotalAds] = useState<AdPropsPrimitives[] | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const segmentsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let prevUrl = document.referrer;
    console.log("prevUrl : ", prevUrl);
  }, []);

  return (
    <main>
      <div className="profileData">
        <p>
          Name: <b>{user.name}</b>
        </p>
        <p>
          Email: <b>{user.email}</b>
        </p>
        <p>
          Rol: <b>{user.rol}</b>
        </p>

        <p>
          Id: <b>{user.id}</b>
        </p>
        <br />
        <br />
      </div>
      <form
        className="createAdForm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            !user.id ||
            !descriptionRef.current ||
            !imageRef.current ||
            !urlRef.current ||
            !segmentsRef.current ||
            !titleRef.current
          )
            return;

          try {
            const resp = await fetch("/api/ads/create", {
              method: "POST",
              body: JSON.stringify({
                advertiserId: user.id,
                description: descriptionRef.current.value,
                image: imageRef.current.value,
                redirectionUrl: urlRef.current.value,
                segments: [segmentsRef.current.value],
                title: titleRef.current.value,
              }),
            });

            console.log("NEW ADD CREATED");
          } catch (err) {
            if (err instanceof Error && err.message === "Failed to fetch")
              console.error(new Error("DESACTIVA EL AD BLOQUER"));
          }
        }}
      >
        <h2>Create Ad</h2>
        <label>Title</label>
        <input ref={titleRef} type="text" placeholder="Title"></input>
        <label>Image</label>
        <input ref={imageRef} type="text" placeholder="Image"></input>
        <label>URL</label>
        <input ref={urlRef} type="text" placeholder="Url"></input>
        <label>Segmentos</label>
        <input ref={segmentsRef} type="text" placeholder="Segmento"></input>
        <label>Descripcion</label>
        <textarea ref={descriptionRef} placeholder="Description"></textarea>
        <button type="submit">Create Ad</button>
      </form>
      <div className="totalAds">
        <button
          type="button"
          onClick={async () => {
            const resp = await fetch("api/ads", {
              method: "GET",
            });
            if (resp.status !== 200) console.error(resp);
            const data: { ads: AdPropsPrimitives[] } = await resp.json();
            setTotalAds(data.ads);
          }}
        >
          REFRESH
        </button>
        <div>
          {!totalAds ? (
            <p>null</p>
          ) : (
            <div>
              <p><b>Total Ads:</b> {`(${totalAds.length})`}</p>
              <ul>
                {totalAds.map((ad) => {
                  return (
                    <li key={ad.id}>
                      <p>{ad.title}</p>
                      <button
                        className="removeAds"
                        type="button"
                        onClick={async () => {
                          try {
                            const resp = await fetch("api/ads/remove", {
                              method: "DELETE",
                              body: JSON.stringify({ adId: ad.id }),
                            });
                            if (resp.status !== 200) console.error(resp);
                          } catch (err) {}
                        }}
                      >
                        Remove {ad.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryParams = new ValidateLoginQueries(query);
  try {
    if (!queryParams.email || !queryParams.token) {
      const session = userSession.getFromServer(context);
      if (!session) throw new ErrorLogIn("No existing session");
      if (session.name !== queryParams.userName)
        throw new ErrorLogIn("You cant access to this profile");
      return {
        props: {
          user: { ...session } as IUser,
        },
      };
    }

    const user = await MongoDB.connectAndDisconnect<IUser | null>(
      async () =>
        await LogInController.initSession(
          {
            email: queryParams.email!,
            token: queryParams.token!,
            userName: queryParams.userName,
          },
          context
        )
    );

    return {
      props: {
        user: { ...user } as IUser,
      },
    };
  } catch (err) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
