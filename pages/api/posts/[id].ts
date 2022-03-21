import { requireAuth, RequireAuthProp} from "@clerk/nextjs/api";
import { deletePost, getPostById, updatePost } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClerkUserPrimaryEmail } from "../../../server/auth/Clerk";

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
)  => {
  // Get the userId from req.auth
  // https://docs.clerk.dev/popular-guides/ssr-beta#introduction-of-the-auth-context
  const { userId } = req.auth;

  // Get the post id from the query params
  // https://nextjs.org/docs/api-routes/dynamic-api-routes
  const postId = req.query.id as string;

   // For this example, we want to identify the email of the person trying to modify some post.
  const primaryEmailAddress = await getClerkUserPrimaryEmail(userId);

  // We check if the persisted post email matches the requesters.
  const persistedPost = await getPostById(postId);

  if (primaryEmailAddress !== persistedPost?.authorEmail) {
    /** If it does not match, he will get a 401 */
    res.status(401).end();
  }

  switch (req.method) {
    case "PUT":
      // The client will send the post object in the PUT request body.
      const modifiedPost = req.body;
      const updatedPost = await updatePost(postId, modifiedPost);

      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      await deletePost(postId);
      res.status(200).json({ completed: true });
      break;
    default:
      res.status(405).end();
      break;
  }
});

