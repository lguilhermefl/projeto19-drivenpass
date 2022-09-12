import { Credentials } from "@prisma/client";

export type Credential = Credentials;
export type CredentialInsertData = Omit<Credential, "id">;
export type CredentialBodyData = Omit<Credential, "id" | "userId">;
