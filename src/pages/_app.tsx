import type { AppProps } from "next/app";
import client from "@/apollo";
import { ApolloProvider } from "@apollo/client";
import { AppContextProvider } from "@/context/AppProvider";
import { globalStyles } from "@/styles/global-styles";
import { Global } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
  );
}
