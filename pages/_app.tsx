import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { defaultTheme } from "../client/theme";
import { MainLayout } from "../client/components/layouts";
import { ChakraProvider } from "@chakra-ui/react";

function ClerkPrismaMongoStarter({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ChakraProvider theme={defaultTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default ClerkPrismaMongoStarter;
