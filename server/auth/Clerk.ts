import { users } from "@clerk/nextjs/api";

export async function getClerkUserPrimaryEmail(userId: string) {
  const user = await users.getUser(userId);
  const primaryEmailAddress = user.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId
  )?.emailAddress as string;

  return primaryEmailAddress;
}
