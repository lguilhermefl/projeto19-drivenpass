import { SafeNotes } from "@prisma/client";

export type SafeNote = SafeNotes;
export type SafeNoteInsertData = Omit<SafeNote, "id">;
export type SafeNoteBodyData = Omit<SafeNote, "id" | "userId">;
