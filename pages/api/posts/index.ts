import { withSession, WithSessionProp } from "@clerk/clerk-sdk-node";
import { createPost, getPosts } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { ClerkInstance } from "../../../server/auth/Clerk";

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  /** Allow only logged in users to view the post list. */
  if (req.session && req.session.userId) {
    switch (req.method) {
      case "GET":
        const postList = await getPosts();
        res.status(200).json(postList);
        break;
      case "POST":
        const user = await ClerkInstance.users.getUser(req.session.userId);
        const primaryEmailAddress = user.emailAddresses.find(
          (emailAddress) => emailAddress.id === user.primaryEmailAddressId
        )?.emailAddress as string;

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
  } else {
    res.status(401).end();
  }
}

export default withSession(handler);
