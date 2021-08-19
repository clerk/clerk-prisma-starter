import { Box, Flex, Text, Image } from "@chakra-ui/react";
// import Image from "next/image";
import { CardLayout } from "./layouts";
import type { Post } from "../../types";
import { useUser } from "@clerk/nextjs";

type PostCardProps = {
  post: Post;
  deletePost: (postId: string) => Promise<void>;
};

export function PostCard({ post, deletePost }: PostCardProps) {
  const user = useUser();
  const primaryEmailAddress = user.primaryEmailAddress?.emailAddress;

  return (
    <CardLayout maxWidth={300}>
      <Box mb={2}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            noOfLines={2}
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="short"
          >
            {post.title}
          </Text>{" "}
          {primaryEmailAddress === post.authorEmail && (
            <Image
              cursor="pointer"
              onClick={async () => await deletePost(post.id)}
              boxSize="20px"
              alt="delete"
              src="/images/trash.png"
            />
          )}
        </Flex>
        <Text>Created: {new Date(post.createdAt).toDateString()}</Text>
      </Box>
      <Box>
        <Text fontWeight="semibold">Content:</Text>
        <Text noOfLines={3} lineHeight="short">
          {post.body}
        </Text>
      </Box>
      <Flex padding="20px 0" mb={"0"} alignItems="center">
        <Image
          height={30}
          width={30}
          alt={post.author}
          src="/images/person.png"
        />
        <Text fontWeight="semibold">Author:&nbsp;</Text>
        <Text>{post.author}</Text>
      </Flex>
    </CardLayout>
  );
}
