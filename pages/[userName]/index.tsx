import { Rol, RolType } from "@/src/domain/Rol";
import { GetServerSideProps, NextPage } from "next";

interface ProfilePageProps {
  userName: string;
  token: string;
  email: string;
}

const ProfilePage: NextPage<ProfilePageProps> = (props) => {
  let { userName } = props;

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, params } = context;

  //console.log("query ", query);

  return {
    props: {
      userName: params!.userName,
    },
  };
};
