import { prisma } from "../config/database";
import { CardInsertData } from "../types/cardTypes";

export async function insert(cardData: CardInsertData) {
  await prisma.cards.create({ data: cardData });
}

export async function findByUserId(userId: number) {
  return await prisma.cards.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.cards.findUnique({
    where: { title_userId: { title, userId } },
  });
}

export async function findById(id: number) {
  return await prisma.cards.findUnique({ where: { id } });
}

export async function remove(id: number) {
  await prisma.cards.delete({ where: { id } });
}
