import { IGenericUserPrimitives } from "@/src/domain/IUser";

export default function HeaderData(props:{user:IGenericUserPrimitives}){
    return <div className="profileData">
    <p>
      Name: <b>{props.user.name}</b>
    </p>
    <p>
      Email: <b>{props.user.email}</b>
    </p>
    <p>
      Rol: <b>{props.user.rol}</b>
    </p>

    <p>
      Id: <b>{props.user.id}</b>
    </p>
    <br />
    <br />
  </div>
}