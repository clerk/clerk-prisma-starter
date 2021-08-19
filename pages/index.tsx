import { SignedIn } from "@clerk/nextjs";
import Head from "next/head";
import { PostList } from "../client/components/PostList";

export default function Index() {
  return (
    <>
      <Head>
        <title>Prisma Mongo starter</title>
        <meta name="description" content="Prisma Mongo starter" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SignedIn>
        <PostList />
      </SignedIn>
    </>
  );
}
