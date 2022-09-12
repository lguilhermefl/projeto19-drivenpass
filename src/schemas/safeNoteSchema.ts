import joi from "joi";
import { SafeNoteBodyData } from "../types/safeNotesTypes";

export const safeNoteSchema = joi.object<SafeNoteBodyData>({
  title: joi.string().max(50).required(),
  note: joi.string().max(1000).required(),
});
