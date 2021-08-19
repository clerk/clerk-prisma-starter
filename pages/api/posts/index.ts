import { requireSession, RequireSessionProp } from "@clerk/nextjs/api";
import { createPost, getPosts } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClerkUserPrimaryEmail } from "../../../server/auth/Clerk";

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  /** Allow only logged in users to view the post list. */
  switch (req.method) {
    case "GET":
      const postList = await getPosts();
      res.status(200).json(postList);
      break;
    case "POST":
      const primaryEmailAddress = await getClerkUserPrimaryEmail(
        req.session.userId as string
      );

      const newPost = req.body;
      /** You can enrich the created post with the identified email as in PUT [id].ts . */
      const createdPost = await createPost({
        authorEmail: primaryEmailAddress,
        ...newPost,
      });
      res.status(201).json(createdPost);
      break;
    default:
      res.status(405).end();
      break;
  }
}

export default requireSession(handler);
