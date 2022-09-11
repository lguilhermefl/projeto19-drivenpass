import * as userRepository from "../repositories/userRepository";
import { UserInsertData } from "../types/userTypes";
import bcrypt from "bcrypt";

export async function signUp(user: UserInsertData) {
  const { email, password }: UserInsertData = user;

  checkSignUpEmail(email);

  const passwordHash: string = generateEncryptedPassword(password);

  const userData: UserInsertData = {
    email,
    password: passwordHash,
  };

  await userRepository.insert(userData);
}

export async function signIn() {}

async function checkSignUpEmail(email: string) {
  const user: any = await getUserByEmail(email);
  if (user) throw { type: "Conflict", message: "This email is already in use" };
}

async function getUserByEmail(email: string) {
  return await userRepository.findByEmail(email);
}

function generateEncryptedPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

export function checkSignInPassword(password: string, cardPassword: string) {
  if (!bcrypt.compareSync(password, cardPassword))
    throw { code: "Unauthorized", message: "Incorrect password" };
}
