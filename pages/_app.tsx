import { NavBar } from "@/components/ui/layouts/App";
import "@/styles/global.css";
import { store } from "@/context/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PageLayout } from "@/components/ui/layouts/PageLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
