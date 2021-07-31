import { Flex, FlexProps } from "@chakra-ui/react";

type CardLayoutProps = {
  children: React.ReactNode;
} & FlexProps;

export function CardLayout({ children, ...flexProps }: CardLayoutProps) {
  return (
    <Flex
      flex="1"
      p="5"
      borderWidth="1px"
      borderRadius="14px"
      borderColor="#ccc"
      flexWrap="wrap"
      minHeight={350}
      {...flexProps}
    >
      {children}
    </Flex>
  );
}
