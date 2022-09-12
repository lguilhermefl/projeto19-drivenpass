import { Request, Response } from "express";
import { SafeNote, SafeNoteBodyData } from "../types/safeNotesTypes";
import * as safeNoteService from "../services/safeNoteService";

export async function create(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const safeNoteData: SafeNoteBodyData = req.body;

  await safeNoteService.create(safeNoteData, tokenPayload.email);

  res.status(201).send("Safe note created");
}

export async function getUserSafeNotes(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;

  const safeNotes: any = await safeNoteService.getUserSafeNotes(
    tokenPayload.email
  );

  res.status(200).send(safeNotes);
}

export async function getSafeNoteById(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const safeNoteId = Number(id);

  const userCredential: SafeNote = await safeNoteService.getUserSafeNoteById(
    safeNoteId,
    tokenPayload.email
  );

  res.status(200).send(userCredential);
}

export async function remove(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const safeNoteId = Number(id);

  await safeNoteService.remove(safeNoteId, tokenPayload.email);

  res.status(200).send("Safe note removed");
}
