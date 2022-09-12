import joi from "joi";
import { WifiBodyData } from "../types/wifiTypes";

export const wifiSchema = joi.object<WifiBodyData>({
  title: joi.string().required(),
  networkName: joi.string().required(),
  password: joi.string().required(),
});
