import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import validateJWT from "../middlewares/validateJwtMiddleware";
import validateIdParams from "../middlewares/validateIdParams";
import { cardSchema } from "../schemas/cardSchema";
import * as cardController from "../controllers/cardController";

const cardRouter = Router();

cardRouter.use(validateJWT());

cardRouter.post(
  "/cards",
  validateBodySchemaMiddleware(cardSchema),
  cardController.create
);

cardRouter.get("/cards", cardController.getUserCards);

cardRouter.get("/cards/:id", validateIdParams, cardController.getCardById);

cardRouter.delete("/cards/:id", validateIdParams, cardController.remove);

export default cardRouter;
