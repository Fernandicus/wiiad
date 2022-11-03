import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";

interface Props {
  user: IGenericUserPrimitives;
  children?: JSX.Element;
}

export function ProfileCard({ user, children }: Props) {
  const imageProfileUrl =
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  return (
    <div className=" inline-flex items-center p-5 h-full space-x-5 bg-white rounded-lg shadow-lg shadow-slate-200">
      <img
        src={imageProfileUrl}
        width={200}
        height={200}
        className="rounded-full h-20 w-20 object-cover"
      ></img>
      <div className="flex items-center ">
        <div className=" ">
          <p className="">
            Hola <span className="text-lg">{user.name}</span>,
          </p>
          <p className="italic text-gray-500">wiiad.com/{user.name}</p>
        </div>
      </div>
    </div>
  );
}
