import joi from "joi";
import { CardBodyData } from "../types/cardTypes";

export const cardSchema = joi.object<CardBodyData>({
  title: joi.string().required(),
  number: joi
    .string()
    .pattern(/^\d{16}$(?!\d)/, { name: "card number" })
    .length(16)
    .required(),
  cardholderName: joi.string().required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "security code" })
    .length(3)
    .required(),
  expirationDate: joi
    .string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { name: "expiration date" })
    .length(5)
    .required(),
  password: joi.string().min(4).max(6).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("debit", "credit", "duo").required(),
});
