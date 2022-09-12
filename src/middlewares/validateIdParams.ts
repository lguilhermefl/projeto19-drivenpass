import { Request, Response, NextFunction } from "express";
import { idSchema } from "../schemas/idSchema";

export default function validateIdParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = idSchema.validate(req.params.id, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(422)
      .send(error.details.map((detail: any) => detail.message));
  }

  return next();
}
