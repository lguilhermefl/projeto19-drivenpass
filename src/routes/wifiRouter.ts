import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import validateJWT from "../middlewares/validateJwtMiddleware";
import validateIdParams from "../middlewares/validateIdParams";
import { wifiSchema } from "../schemas/wifiSchema";
import * as wifiController from "../controllers/wifiController";

const wifiRouter = Router();

wifiRouter.use(validateJWT());

wifiRouter.post(
  "/wifis",
  validateBodySchemaMiddleware(wifiSchema),
  wifiController.create
);

wifiRouter.get("/wifis", wifiController.getUserWifiNetworks);

wifiRouter.get(
  "/wifis/:id",
  validateIdParams,
  wifiController.getWifiNetworkById
);

wifiRouter.delete("/wifis/:id", validateIdParams, wifiController.remove);

export default wifiRouter;
