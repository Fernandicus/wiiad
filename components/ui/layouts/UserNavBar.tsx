import { Logout } from "../login/Logout";

export const UserNavBar = () => {
  return (
    <div className="flex justify-end py-5">
      <Logout />
    </div>
  );
};
