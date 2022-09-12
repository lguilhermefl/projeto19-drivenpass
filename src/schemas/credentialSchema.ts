import joi from "joi";
import { CredentialBodyData } from "../types/credentialTypes";

export const credentialSchema = joi.object<CredentialBodyData>({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
