import { Card, CardBodyData } from "../types/cardTypes";
import * as cardRepository from "../repositories/cardRepository";
import * as userRepository from "../repositories/userRepository";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export async function create(cardData: CardBodyData, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);

  await checkTitle(cardData.title, user.id);

  const userId: number = user.id;
  const password: string = encryptData(cardData.password);
  const securityCode: string = encryptData(cardData.securityCode);

  await cardRepository.insert({ ...cardData, userId, password, securityCode });
}

export async function getUserCards(userEmail: string): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const userCards: any = await getCardsByUserId(user.id);

  checkUserCards(userCards);

  const decryptedUserCards: any = decryptUserCards(userCards);

  return decryptedUserCards;
}

export async function getUserCardById(
  id: number,
  userEmail: string
): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const card: Card = await getCardById(id);

  checkCard(card);
  checkCardOwner(user.id, card.userId);

  const decryptedCard: Card = {
    ...card,
    password: decryptData(card.password),
    securityCode: decryptData(card.securityCode),
  };

  return decryptedCard;
}

export async function remove(id: number, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);
  const card: Card = await getCardById(id);

  checkCard(card);
  checkCardOwner(user.id, card.userId);

  await deleteCard(id);
}

async function getUserByEmail(email: string): Promise<any> {
  return await userRepository.findByEmail(email);
}

async function getCardByTitleAndUserId(
  title: string,
  userId: number
): Promise<any> {
  return await cardRepository.findByTitleAndUserId(title, userId);
}

async function checkTitle(title: string, userId: number) {
  const cardWithTitle: any = await getCardByTitleAndUserId(title, userId);

  if (cardWithTitle)
    throw {
      type: "Conflict",
      message: `User already has a card with title ${title}`,
    };
}

function encryptData(data: string): string {
  return cryptr.encrypt(data);
}

function decryptData(data: string): string {
  return cryptr.decrypt(data);
}

function decryptUserCards(userCards: any): any {
  return userCards.map((card: Card) => {
    const decryptedCard: Card = { ...card };
    decryptedCard.password = cryptr.decrypt(card.password);
    decryptedCard.securityCode = cryptr.decrypt(card.securityCode);

    return decryptedCard;
  });
}

async function getCardsByUserId(userId: number): Promise<any> {
  return await cardRepository.findByUserId(userId);
}

function checkUserCards(cards: any) {
  if (!cards)
    throw { type: "Not Found", message: "User has no cards registered" };
}

async function getCardById(id: number): Promise<any> {
  return await cardRepository.findById(id);
}

function checkCard(card: Card) {
  if (!card) throw { type: "Not Found", message: "Card id not found" };
}

function checkCardOwner(userId: number, cardUserId: number) {
  if (userId !== cardUserId)
    throw {
      type: "Not Found",
      message: "Card not found in your registries",
    };
}

async function deleteCard(id: number) {
  await cardRepository.remove(id);
}
