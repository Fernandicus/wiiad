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
import axios from "axios";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";

export default function CreateAdForm(props: {
  user: IGenericUserPrimitives;
  createAd: AdType;
  onBack(): void;
  handleResponse: (data: NotificationData) => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const segmentsRef = useRef<HTMLInputElement>(null);

  const [isFileOk, setIsFileOk] = useState<boolean>(false);

  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>();

  const [isSendingAd, setIsSendingAd] = useState(false);

  const submitAd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSendingAd) return;
    setIsSendingAd(true);
    props.handleResponse({
      message: "Creando anuncio . . .",
      status: "info",
    });
    try {
      const apiRoute =
        props.createAd == "banner"
          ? ApiRoutes.createBannerAd
          : ApiRoutes.createVideoAd;

      const resp = await axios.post(
        apiRoute,
        {
          title: titleRef.current!.value,
          description: descriptionRef.current!.value,
          image: filePreview,
          redirectionUrl: urlRef.current!.value,
          segments: [segmentsRef.current!.value],
        },
        {
          onUploadProgress: function (progressEvent) {
            const event = progressEvent;
            var percentCompleted = Math.round(
              (event.loaded * 100) / event.total!
            );
            console.log("Uploaded: " + percentCompleted + "%");
          },
        }
      );
      setIsSendingAd(false);
      if (resp.status === 200) {
        props.handleResponse({
          message: "Anuncio creado!",
          status: "success",
        });
        window.location.reload();
      } else {
        const respJSON = resp.data;
        props.handleResponse({
          message: respJSON["info"],
          status: "error",
        });
      }
    } catch (err) {
      setIsSendingAd(false);
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          props.handleResponse({
            message: "Desactiva el bloqueador de anuncios",
            status: "error",
          });
        } else {
          props.handleResponse({
            message: err.message,
            status: "error",
          });
        }
      }
    }
  };

  return (
    <div className="max-w-xl w-full py-10">
      <div className="flex space-x-4   pb-5">
        <button
          onClick={props.onBack}
          className="w-6 h-auto hover:text-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="font-bold text-xl  ">Crea tu anuncio</div>
      </div>
      <form className="w-full  space-y-5" onSubmit={submitAd}>
        {props.createAd == "banner" ? (
          <SelectImage
            onSelectImage={(image) => setFilePreview(image)}
            imagePreview={filePreview}
            onSuccess={() => {
              setIsFileOk(true);
            }}
          />
        ) : props.createAd == "video" ? (
          <SelectVideo
            onSelectVideo={(video) => setFilePreview(video)}
            videoPreview={filePreview}
            onSuccess={() => {
              setIsFileOk(true);
            }}
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
            type={isFileOk ? "submit" : "button"}
            className={
              isFileOk
                ? "bg-sky-500 text-white p-2 rounded-md hover:bg-sky-400"
                : "bg-gray-300 text-gray-500 p-2 rounded-md "
            }
          >
            {isSendingAd ? (
              <div className="w-6 h-6">
                <LoadingSpinnerAnimation />
              </div>
            ) : (
              "Crear anuncio"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
