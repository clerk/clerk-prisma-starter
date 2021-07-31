import { SimpleGrid, Text, Button, Fade } from "@chakra-ui/react";
import { AddPostForm } from "./AddPostForm";
import { SkeletonGrid } from "./SkeletonGrid";
import { CardLayout } from "./layouts";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";
import { useState } from "react";
import { Prisma } from "@prisma/client";

export function PostList() {
  const {
    posts,
    postsRetrievalError,
    arePostsLoading,
    createPost,
    deletePost,
  } = usePosts();

  if (postsRetrievalError) {
    return <ErrorMessage />;
  }

  if (arePostsLoading) {
    return <SkeletonGrid />;
  }

  return (
    <Fade transition={{ enter: { duration: 1 } }} in={!arePostsLoading}>
      <SimpleGrid minChildWidth="250px" gap={8}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} deletePost={deletePost} />
        ))}
        <AddPost createPost={createPost} />
      </SimpleGrid>
    </Fade>
  );
}

function AddPost({
  createPost,
}: {
  createPost: (post: Prisma.PostCreateInput) => Promise<void>;
}) {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <CardLayout
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      maxWidth={300}
    >
      {isFormActive ? (
        <Fade transition={{ enter: { duration: 0.5 } }} in={isFormActive}>
          <AddPostForm
            createPost={createPost}
            closePostForm={() => setIsFormActive(false)}
          />
        </Fade>
      ) : (
        <AddPostButton openPostForm={() => setIsFormActive(true)} />
      )}
    </CardLayout>
  );
}

const AddPostButton = ({ openPostForm }: { openPostForm: () => void }) => (
  <>
    <Button
      height="5rem"
      width="5rem"
      borderWidth={3}
      color="gray"
      fontSize="4rem"
      variant="outline"
      onClick={openPostForm}
    >
      +
    </Button>
    <Text mt="4" fontSize="md" lineHeight="short">
      Add Post
    </Text>
  </>
);

const ErrorMessage = () => (
  <Text color="red">
    Sorry, something went wrong! Please check your setup 💀
  </Text>
);
