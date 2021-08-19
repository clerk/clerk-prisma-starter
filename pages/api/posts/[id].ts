import { requireSession, RequireSessionProp } from "@clerk/nextjs/api";
import { deletePost, getPostById, updatePost } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClerkUserPrimaryEmail } from "../../../server/auth/Clerk";

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  /** On how this works visit https://nextjs.org/docs/api-routes/dynamic-api-routes */
  const postId = req.query.id as string;

  /**
   * For this example, we want to identify the email of the person trying to modify some post.
   * We do this through the Clerk cookie ;)
   */
  const primaryEmailAddress = await getClerkUserPrimaryEmail(
    req.session.userId as string
  );

  /** We check if the persisted post email matches the requesters. */
  const persistedPost = await getPostById(postId);

  if (primaryEmailAddress !== persistedPost?.authorEmail) {
    /** If it does not match, he will get a 401 */
    res.status(401).end();
  }

  switch (req.method) {
    case "PUT":
      /** The client will send the post object in the PUT request body. */
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
}

export default requireSession(handler);
