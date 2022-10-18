import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export default function AdView(props:{ads: AdPropsPrimitives[]}){
    return <div>
    <h1>NO SESSION or NOT YOUR PROFILE</h1>
    <ul>
      {!props.ads ? <p>This advertiser has no ads</p> : props.ads.map((ad) => {
        return (
          <li key={ad.id}>
            <p>{ad.title}</p>
            <p>{ad.redirectionUrl}</p>
            <p>{ad.segments}</p>
          </li>
        );
      })}
    </ul>
  </div>
}