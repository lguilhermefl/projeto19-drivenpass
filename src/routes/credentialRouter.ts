import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import validateJWT from "../middlewares/validateJwtMiddleware";
import validateIdParams from "../middlewares/validateIdParams";
import { credentialSchema } from "../schemas/credentialSchema";
import * as credentialController from "../controllers/credentialController";

const credentialRouter = Router();

credentialRouter.use(validateJWT());

credentialRouter.post(
  "/credentials",
  validateBodySchemaMiddleware(credentialSchema),
  credentialController.create
);

credentialRouter.get("/credentials", credentialController.getUserCredentials);

credentialRouter.get(
  "/credentials/:id",
  validateIdParams,
  credentialController.getCredentialById
);

credentialRouter.delete(
  "/credentials/:id",
  validateIdParams,
  credentialController.remove
);

export default credentialRouter;
