import { IGenericUserPrimitives } from "@/src/common/domain/interfaces/GenericUser";

interface Props {
  user: IGenericUserPrimitives;
  children?: JSX.Element;
}

export function ProfileCard({ user, children }: Props) {
  return (
    <div className=" inline-flex items-center p-5 h-full space-x-5 bg-white rounded-lg shadow-lg shadow-slate-200">
      <img
        src={user.profilePic}
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
