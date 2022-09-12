import joi from "joi";

export const idSchema = joi
  .string()
  .pattern(/^[1-9][0-9]*$/, { name: "id" })
  .required()
  .messages({
    "any.required": "Id is required",
    "string.pattern.name": "Id is not valid",
  });
