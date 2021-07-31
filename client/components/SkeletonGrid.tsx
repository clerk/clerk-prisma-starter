import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { CardLayout } from "./layouts";

export function SkeletonGrid() {
  return (
    <SimpleGrid minChildWidth="250px" gap={8}>
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>{" "}
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>{" "}
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>{" "}
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>
      <Skeleton>
        <CardLayout>
          <></>
        </CardLayout>
      </Skeleton>
    </SimpleGrid>
  );
}
