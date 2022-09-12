import { Request, Response } from "express";
import { Card, CardBodyData } from "../types/cardTypes";
import * as cardService from "../services/cardService";

export async function create(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const cardData: CardBodyData = req.body;

  await cardService.create(cardData, tokenPayload.email);

  res.status(201).send("Card created");
}

export async function getUserCards(req: Request, res: Response): Promise<any> {
  const tokenPayload: any = res.locals.payload;

  const cards: any = await cardService.getUserCards(tokenPayload.email);

  res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response): Promise<any> {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const cardId = Number(id);

  const userCard: Card = await cardService.getUserCardById(
    cardId,
    tokenPayload.email
  );

  res.status(200).send(userCard);
}

export async function remove(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const cardId = Number(id);

  await cardService.remove(cardId, tokenPayload.email);

  res.status(200).send("Card removed");
}
