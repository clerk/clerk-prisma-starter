import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box margin="0 auto">
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="300"
        bgImage="url('images/pattern.svg')"
        backgroundPosition="right"
        mb="2em"
      >
        <Text color="white" fontSize="xxx-large" fontWeight="bold">
          Clerk - Prisma starter
        </Text>
      </Flex>
      <Box margin="0 auto" maxW={1000}>
        {children}
      </Box>
      <Flex justifyContent="center" mt="10">
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Flex>
    </Box>
  );
}

const SignInButton = () => {
  const { openSignIn } = useClerk();
  return (
    <Button
      mr="10"
      variant="solid"
      colorScheme="green"
      onClick={() => openSignIn({})}
    >
      Sign in to your posting job!
    </Button>
  );
};

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button mr="10" variant="solid" colorScheme="red" onClick={() => signOut()}>
      Sign out of your posting spree!
    </Button>
  );
};
