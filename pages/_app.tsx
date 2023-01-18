import { campaignsStore } from "@/components/hooks/reducers/advertiser/campaigns-reducer";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={campaignsStore}>
      <Component {...pageProps} />;
    </Provider>
  );
}
