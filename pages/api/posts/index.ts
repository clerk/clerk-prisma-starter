import { requireAuth, RequireAuthProp} from "@clerk/nextjs/api";
import { createPost, getPosts } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClerkUserPrimaryEmail } from "../../../server/auth/Clerk";

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) => {
  // Get the userId from req.auth
  // https://docs.clerk.dev/popular-guides/ssr-beta#introduction-of-the-auth-context
  const { userId } = req.auth;

  switch (req.method) {
    case "GET":
      const postList = await getPosts();
      res.status(200).json(postList);
      break;
    case "POST":
      const primaryEmailAddress = await getClerkUserPrimaryEmail(userId);

      const newPost = req.body;
      // You can enrich the created post with the identified email as in PUT [id].ts
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
});

