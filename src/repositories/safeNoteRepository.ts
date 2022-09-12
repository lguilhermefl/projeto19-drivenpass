import { prisma } from "../config/database";
import { SafeNoteInsertData } from "../types/safeNotesTypes";

export async function insert(safeNoteData: SafeNoteInsertData) {
  await prisma.safeNotes.create({ data: safeNoteData });
}

export async function findByUserId(userId: number) {
  return await prisma.safeNotes.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.safeNotes.findUnique({
    where: { title_userId: { title, userId } },
  });
}

export async function findById(id: number) {
  return await prisma.safeNotes.findUnique({ where: { id } });
}

export async function remove(id: number) {
  await prisma.safeNotes.delete({ where: { id } });
}
