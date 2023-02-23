import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { CardItem } from "../../../items/CardItem";

interface Props {
  user: IUserPrimitives;
}

export function UserDataProfile({ user }: Props) {
  return (
    <div className="flex items-center space-x-5">
      <img
        src={user.profilePic}
        width={200}
        height={200}
        className="rounded-full h-20 w-20 object-cover"
      ></img>
      <div className="flex items-center ">
        <div className=" ">
          <p className="text-lg">{user.name}</p>
          <p className="italic text-gray-500 text-sm">wiiad.com/{user.name}</p>
        </div>
      </div>
    </div>
  );
}
