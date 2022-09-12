import { Cards } from "@prisma/client";

export type Card = Cards;
export type CardInsertData = Omit<Card, "id">;
export type CardBodyData = Omit<Card, "id" | "userId">;
