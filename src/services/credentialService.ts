import { Credential, CredentialBodyData } from "../types/credentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import * as userRepository from "../repositories/userRepository";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export async function create(
  credentialData: CredentialBodyData,
  userEmail: string
) {
  const user: any = await getUserByEmail(userEmail);

  await checkTitle(credentialData.title, user.id);

  const password: string = encryptPassword(credentialData.password);
  const userId: number = user.id;

  await credentialRepository.insert({ ...credentialData, userId, password });
}

export async function getUserCredentials(userEmail: string): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const userCredentials: any = await getCredentialsByUserId(user.id);

  checkUserCredentials(userCredentials);

  const decryptedUserCredentials: any = decryptUserCredentials(userCredentials);

  return decryptedUserCredentials;
}

export async function getUserCredentialById(
  id: number,
  userEmail: string
): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const credential: Credential = await getCredentialById(id);

  checkCredential(credential);
  checkCredentialOwner(user.id, credential.userId);

  const decryptedCredential = {
    ...credential,
    password: cryptr.decrypt(credential.password),
  };

  return decryptedCredential;
}

export async function remove(id: number, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);
  const credential: Credential = await getCredentialById(id);

  checkCredential(credential);
  checkCredentialOwner(user.id, credential.userId);

  await deleteCredential(id);
}

async function checkTitle(title: string, userId: number) {
  const credentialWithTitle: any = await getCredentialByTitleAndUserId(
    title,
    userId
  );

  if (credentialWithTitle)
    throw {
      type: "Conflict",
      message: `User already has a credential with title ${title}`,
    };
}

async function getUserByEmail(email: string): Promise<any> {
  return await userRepository.findByEmail(email);
}

async function getCredentialByTitleAndUserId(
  title: string,
  userId: number
): Promise<any> {
  return await credentialRepository.findByTitleAndUserId(title, userId);
}

function encryptPassword(password: string): string {
  return cryptr.encrypt(password);
}

async function getCredentialsByUserId(userId: number): Promise<any> {
  return await credentialRepository.findByUserId(userId);
}

function decryptUserCredentials(userCredentials: any): any {
  return userCredentials.map((credential: Credential) => {
    const decryptedCredential: Credential = { ...credential };
    decryptedCredential.password = cryptr.decrypt(credential.password);

    return decryptedCredential;
  });
}

function checkUserCredentials(credentials: any) {
  if (!credentials)
    throw { type: "Not Found", message: "User has no credentials registered" };
}

async function getCredentialById(id: number): Promise<any> {
  return await credentialRepository.findById(id);
}

function checkCredential(credential: Credential) {
  if (!credential)
    throw { type: "Not Found", message: "Credential id not found" };
}

function checkCredentialOwner(userId: number, credentialUserId: number) {
  if (userId !== credentialUserId)
    throw {
      type: "Not Found",
      message: "Credential not found in your registries",
    };
}

async function deleteCredential(id: number) {
  await credentialRepository.remove(id);
}
