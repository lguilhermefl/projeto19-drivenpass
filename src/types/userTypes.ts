import { Users } from "@prisma/client";

export type User = Users;
export type UserInsertData = Omit<User, "id">;
