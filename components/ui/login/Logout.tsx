import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useRouter } from "next/router";
import { ExitIcon } from "../icons/ExitIcon";

export const Logout = () => {
  const router = useRouter();

  const exit = async () => {
    fetch(ApiRoutes.logout).then((resp) => {
      router.push("/");
    });
  };

  return (
    <button
      className="px-1 group hover:bg-red-500 transition ease-in duration-75 rounded-md flex items-center space-x-2"
      onClick={exit}
    >
      <p className="text-red-500 group-hover:text-white ">Salir</p>
      <div className="text-red-500 group-hover:text-white w-4 stroke-2 stroke-red-500 ">
        <ExitIcon />
      </div>
    </button>
  );
};
