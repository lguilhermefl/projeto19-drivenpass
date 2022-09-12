import { prisma } from "../config/database";
import { CredentialInsertData } from "../types/credentialTypes";

export async function insert(credentialData: CredentialInsertData) {
  await prisma.credentials.create({ data: credentialData });
}

export async function findByUserId(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.credentials.findUnique({
    where: { title_userId: { title, userId } },
  });
}

export async function findById(id: number) {
  return await prisma.credentials.findUnique({ where: { id } });
}

export async function remove(id: number) {
  await prisma.credentials.delete({ where: { id } });
}
