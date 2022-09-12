import { Request, Response } from "express";
import { UserInsertData } from "../types/userTypes";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const newUser: UserInsertData = req.body;

  await authService.signUp(newUser);

  res.status(201).send("User created successfully");
}

export async function signIn(req: Request, res: Response): Promise<any> {
  const user: UserInsertData = req.body;

  const token: string = await authService.signIn(user);

  res.status(200).send({ token });
}
