import { Dispatch, SetStateAction } from "react";

interface AdResourceSelectorProps {
  onCreateVideoAd(): void;
  onCreateImageAd(): void;
}

export const AdResourceSelector = ({
  onCreateVideoAd,
  onCreateImageAd,
}: AdResourceSelectorProps) => {
  return (
    <div className=" flex justify-center ">
      <div className=" bg-white  rounded-lg py-2 px-5 shadow-lg shadow-slate-200">
        <div className=" space-x-7">
          <button className="text-center group">
            <div
              className="text-sky-500 mx-auto group-hover:text-white group-hover:bg-sky-400 p-1 w-7 rounded-md transform ease-in duration-75"
              onClick={() => onCreateVideoAd()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
            </div>
            <p className="text-xs text-sky-500">Video</p>
          </button>
          <button className="text-center group ">
            <div
              className="text-sky-500 mx-auto group-hover:text-white group-hover:bg-sky-400 p-1 w-7 rounded-md transform ease-in duration-75"
              onClick={() => onCreateImageAd()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xs text-sky-500">Banner</p>
          </button>
        </div>
      </div>
    </div>
  );
};
