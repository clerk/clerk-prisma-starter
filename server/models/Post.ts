import type { Prisma } from "../../types";
import prisma from "../db/prisma";

export async function getPosts() {
  return await prisma.post.findMany();
}

export async function getPostById(postId: string) {
  return await prisma.post.findFirst({ where: { id: postId } });
}

export async function createPost(data: Prisma.PostCreateInput) {
  return await prisma.post.create({ data });
}

export async function updatePost(id: string, data: Prisma.PostUpdateInput) {
  return await prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: string) {
  return await prisma.post.delete({
    where: { id },
  });
}
