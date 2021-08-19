import { Clerk } from "@clerk/nextjs/api";

export const ClerkInstance = new Clerk({ apiKey: process.env.CLERK_API_KEY });

export async function getClerkUserPrimaryEmail(userId: string) {
  const user = await ClerkInstance.users.getUser(userId);
  const primaryEmailAddress = user.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId
  )?.emailAddress as string;

  return primaryEmailAddress;
}
