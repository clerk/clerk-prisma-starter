import { useEffect, useState } from "react";
import type { Post, Prisma } from "../../types";

export function usePosts() {
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsRetrievalError, setPostsRetrievalError] = useState(null);

  /** Example of how to properly retrieve posts. */
  useEffect(() => {
    const retrievePosts = async function () {
      setArePostsLoading(true);
      try {
        const posts = (await (await fetch(`/api/posts`)).json()) as Post[];
        setPosts(posts);
      } catch (err: any) {
        setPostsRetrievalError(err);
      } finally {
        setArePostsLoading(false);
      }
    };

    retrievePosts();
  }, []);

  /** Example of how to update a single post. */
  const updatePost = async function (
    postId: string,
    post: Prisma.PostUpdateInput
  ) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const [updatedPost] = await response.json();

      /** Find the changed post and replace it. */
      const updatedPostIndex = posts.findIndex(
        (post) => post.id === updatedPost.id
      );
      posts.splice(updatedPostIndex, 1, updatedPost);

      setPosts([...posts]);
    } catch (err) {
      throw err;
    }
  };

  const deletePost = async function (postId: string) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Find the changed post and delete it. */
      const deletedPostIndex = posts.findIndex((post) => post.id === postId);
      posts.splice(deletedPostIndex, 1);
      setPosts([...posts]);
    } catch (err) {
      throw err;
    }
  };

  const createPost = async function (post: Prisma.PostCreateInput) {
    try {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Append the new post on the existing ones */
      const newPost = await response.json();
      setPosts([...posts, newPost]);
    } catch (err) {
      throw err;
    }
  };

  return {
    arePostsLoading,
    posts,
    postsRetrievalError,
    updatePost,
    deletePost,
    createPost,
  };
}
