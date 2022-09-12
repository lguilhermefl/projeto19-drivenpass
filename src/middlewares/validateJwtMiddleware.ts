import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function validateJWT() {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
      throw { type: "Unauthorized", message: "Token is required" };
    }

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";

    try {
      const decodedPayload = jwt.verify(token, SECRET);

      res.locals.payload = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).send("Token is not valid");
    }
  };
}
