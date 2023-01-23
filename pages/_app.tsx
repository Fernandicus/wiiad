import "@/styles/global.css";
import { store } from "context/common/infrastructure/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
