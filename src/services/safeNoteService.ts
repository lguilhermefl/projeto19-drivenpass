import { SafeNote, SafeNoteBodyData } from "../types/safeNotesTypes";
import * as safeNoteRepository from "../repositories/safeNoteRepository";
import * as userRepository from "../repositories/userRepository";

export async function create(
  safeNoteData: SafeNoteBodyData,
  userEmail: string
) {
  const user: any = await getUserByEmail(userEmail);

  await checkTitle(safeNoteData.title, user.id);

  const userId: number = user.id;

  await safeNoteRepository.insert({ ...safeNoteData, userId });
}

export async function getUserSafeNotes(userEmail: string): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const userSafeNotes: any = await getSafeNotesByUserId(user.id);

  checkUserSafeNotes(userSafeNotes);

  return userSafeNotes;
}

export async function getUserSafeNoteById(
  id: number,
  userEmail: string
): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const safeNote: SafeNote = await getSafeNoteById(id);

  checkSafeNote(safeNote);
  checkSafeNoteOwner(user.id, safeNote.userId);

  return safeNote;
}

export async function remove(id: number, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);
  const safeNote: SafeNote = await getSafeNoteById(id);

  checkSafeNote(safeNote);
  checkSafeNoteOwner(user.id, safeNote.userId);

  await deleteSafeNote(id);
}

async function getUserByEmail(email: string): Promise<any> {
  return await userRepository.findByEmail(email);
}

async function getSafeNoteByTitleAndUserId(
  title: string,
  userId: number
): Promise<any> {
  return await safeNoteRepository.findByTitleAndUserId(title, userId);
}

async function checkTitle(title: string, userId: number) {
  const safeNoteWithTitle: any = await getSafeNoteByTitleAndUserId(
    title,
    userId
  );

  if (safeNoteWithTitle)
    throw {
      type: "Conflict",
      message: `User already has a safe note with title ${title}`,
    };
}

async function getSafeNotesByUserId(userId: number): Promise<any> {
  return await safeNoteRepository.findByUserId(userId);
}

function checkUserSafeNotes(safeNotes: any) {
  if (!safeNotes)
    throw { type: "Not Found", message: "User has no safe notes registered" };
}

async function getSafeNoteById(id: number): Promise<any> {
  return await safeNoteRepository.findById(id);
}

function checkSafeNote(safeNote: SafeNote) {
  if (!safeNote) throw { type: "Not Found", message: "Safe note id not found" };
}

function checkSafeNoteOwner(userId: number, safeNoteUserId: number) {
  if (userId !== safeNoteUserId)
    throw {
      type: "Not Found",
      message: "Safe note not found in your registries",
    };
}

async function deleteSafeNote(id: number) {
  await safeNoteRepository.remove(id);
}
