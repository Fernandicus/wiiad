import { SelectImage } from "../profile/advertiser/create-ad-form/SelectImage";
import { SelectVideo } from "../profile/advertiser/create-ad-form/SelectVideo";
import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import React, { FormEvent, useRef, useState } from "react";
import {
  NotificationData,
  Notifications,
} from "../notifications/Notifications";
import { AdType } from "@/pages/[userName]/ads";

export default function CreateAdForm(props: {
  user: IGenericUserPrimitives;
  createAd: AdType;
  handleResponse: (data: NotificationData) => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const segmentsRef = useRef<HTMLInputElement>(null);

  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>();

  const imageRef = useRef<HTMLInputElement>(null);

  const submitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await fetch(ApiRoutes.createAd, {
        method: "POST",
        body: JSON.stringify({
          title: titleRef.current!.value,
          description: descriptionRef.current!.value,
          image: filePreview,
          redirectionUrl: urlRef.current!.value,
          segments: [segmentsRef.current!.value],
        }),
      });

      if (resp.status === 200) {
        props.handleResponse({
          message: "Anuncio creado!",
          status: 0,
        });
      } else {
        const respJSON = await resp.json();
        props.handleResponse({
          message: respJSON["info"],
          status: resp.status,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          props.handleResponse({
            message: "Desactiva el bloqueador de anuncios",
            status: 400,
          });
        } else {
          props.handleResponse({
            message: err.message,
            status: 400,
          });
        }
      }
    }
  };

  return (
    <div className="max-w-xl w-full py-10">
      <h1 className="font-bold text-xl pb-5">Crea tu anuncio</h1>
      <form className="w-full  space-y-5" onSubmit={submitAd}>
        {props.createAd == "banner" ? (
          <SelectImage
            onSelectImage={(image) => setFilePreview(image)}
            imagePreview={filePreview}
          />
        ) : props.createAd == "video" ? (
          <SelectVideo
            onSelectVideo={(video) => setFilePreview(video)}
            videoPreview={filePreview}
          />
        ) : null}
        <div className="space-y-2">
          <label className="font-bold">Titulo</label>
          <input
            required
            ref={titleRef}
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-md px-2 block w-full h-10"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold">URL</label>
          <input
            required
            ref={urlRef}
            type="text"
            placeholder="Url"
            className="border border-gray-300 rounded-md px-2 block w-full h-10"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold">Segmentos</label>
          <input
            required
            ref={segmentsRef}
            type="text"
            placeholder="Segmento"
            className="border border-gray-300 rounded-md px-2 block w-full h-10"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold">Descripcion</label>
          <textarea
            required
            ref={descriptionRef}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-md px-2 block w-full h-10"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-500 text-white p-2 rounded-md hover:bg-sky-400 "
          >
            Crear anuncio
          </button>
        </div>
      </form>
    </div>
  );
}
