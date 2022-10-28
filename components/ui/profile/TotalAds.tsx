import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { useState } from "react";

export default function TotalAds() {
  const [totalAds, setTotalAds] = useState<AdPropsPrimitives[] | null>(null);
  const refresh = async () => {
    const resp = await fetch("api/ads", {
      method: "GET",
    });
    if (resp.status !== 200) console.error(resp);
    const data: { ads: AdPropsPrimitives[] } = await resp.json();
    setTotalAds(data.ads);
  };
  const deleteAd = async (id: string) => {
    try {
      const resp = await fetch("api/ads/remove", {
        method: "DELETE",
        body: JSON.stringify({ adId: id }),
      });
      if (resp.status !== 200) console.error(resp);
    } catch (err) {}
  };

  return (
    <div className="totalAds">
      <button type="button" onClick={refresh}>
        REFRESH
      </button>
      <div>
        {!totalAds ? (
          <p>null</p>
        ) : (
          <div>
            <p>
              <b>Total Ads:</b> {`(${totalAds.length})`}
            </p>
            <ul>
              {totalAds.map((ad) => {
                return (
                  <li key={ad.id}>
                    <p>{ad.title}</p>
                    <button
                      className="removeAds"
                      type="button"
                      onClick={() => deleteAd(ad.id)}
                    >
                      Remove {ad.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
