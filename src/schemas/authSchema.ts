import joi from "joi";
import { UserInsertData } from "../types/userTypes";

export const authSchema = joi.object<UserInsertData>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});
