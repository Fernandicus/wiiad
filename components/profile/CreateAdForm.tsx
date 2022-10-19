import { IUser } from "@/src/domain/IUser";
import { FormEvent, useRef, useState } from "react";

export default function CreateAdForm(props: { user: IUser }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const segmentsRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>();
  const imageRef = useRef<HTMLInputElement>(null);
  const submitAdUrl: string = "/api/ads/create";

  const submitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !props.user.id ||
      !descriptionRef.current ||
      !imagePreview ||
      !urlRef.current ||
      !segmentsRef.current ||
      !titleRef.current
    )
      return;

    try {
      await fetch(submitAdUrl, {
        method: "POST",
        body: JSON.stringify({
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          image: imagePreview,
          redirectionUrl: urlRef.current.value,
          segments: [segmentsRef.current.value],
        }),
      });

      console.log("NEW ADD CREATED ");
    } catch (err) {
      if (err instanceof Error && err.message === "Failed to fetch")
        console.error(new Error("DESACTIVA EL AD BLOQUER"));
    }
  };

  return (
    <form className="createAdForm" onSubmit={submitAd}>
      <h2>Create Ad</h2>
      <label>Image</label>
      <input
        //ref={imageRef}
        type="File"
        placeholder="Image"
        onChange={(event) => {
          event.preventDefault();
          console.log(event.target.files![0]);
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files![0]);
          reader.onloadend = () => {
            console.log(reader.result);
            setImagePreview(reader.result)
          };
        }}
      ></input>
      {imagePreview && <img src={imagePreview.toString()} alt="alt"></img>}
      <label>Title</label>
      <input ref={titleRef} type="text" placeholder="Title"></input>
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
