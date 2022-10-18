import { IUser } from "@/src/domain/IUser";
import { FormEvent, useRef } from "react";

export default function CreateAdForm(props: { user: IUser }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const segmentsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const submitAdUrl: string = "/api/ads/create";

  const submitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !props.user.id ||
      !descriptionRef.current ||
      !imageRef.current ||
      !urlRef.current ||
      !segmentsRef.current ||
      !titleRef.current
    )
      return;

    try {
      const resp = await fetch(submitAdUrl, {
        method: "POST",
        body: JSON.stringify({
          advertiserId: props.user.id,
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
  };

  return (
    <form className="createAdForm" onSubmit={submitAd}>
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
  );
}
