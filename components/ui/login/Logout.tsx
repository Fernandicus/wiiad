import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useRouter } from "next/router";

export const Logout = () => {
  const router = useRouter();

  const exit = async () => {
    fetch(ApiRoutes.logout).then((resp) => {
      router.push("/login");
    });
  };

  return (
    <div className="fixed top-0 left-0 p-5">
      <button
        className=" bg-red-500 group hover:bg-white transition ease-in duration-75 p-2 rounded-md shadow-lg shadow-slate-300 flex space-x-2"
        onClick={exit}
      >
        <div className="text-white group-hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
        <p className="text-white group-hover:text-red-500">Salir</p>
      </button>
    </div>
  );
};
