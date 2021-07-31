import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { defaultTheme } from "../client/theme";
import { MainLayout } from "../client/components/layouts";
import { ChakraProvider } from "@chakra-ui/react";

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function ClerkPrismaMongoStarter({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => router.push(to)}
    >
      <ChakraProvider theme={defaultTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default ClerkPrismaMongoStarter;
