import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import validateJWT from "../middlewares/validateJwtMiddleware";
import validateIdParams from "../middlewares/validateIdParams";
import { safeNoteSchema } from "../schemas/safeNoteSchema";
import * as safeNoteController from "../controllers/safeNoteController";

const safeNoteRouter = Router();

safeNoteRouter.use(validateJWT());

safeNoteRouter.post(
  "/safenotes",
  validateBodySchemaMiddleware(safeNoteSchema),
  safeNoteController.create
);

safeNoteRouter.get("/safenotes", safeNoteController.getUserSafeNotes);

safeNoteRouter.get(
  "/safenotes/:id",
  validateIdParams,
  safeNoteController.getSafeNoteById
);

safeNoteRouter.delete(
  "/safenotes/:id",
  validateIdParams,
  safeNoteController.remove
);

export default safeNoteRouter;
