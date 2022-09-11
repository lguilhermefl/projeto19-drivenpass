import { Users } from "@prisma/client";

export type UserInsertData = Omit<Users, "id">;
