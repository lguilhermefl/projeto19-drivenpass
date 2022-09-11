import { prisma } from "../config/database";

export async function insert(user: any) {
  await prisma.users.create({ data: user });
}

export async function findByEmail(email: string) {
  await prisma.users.findUnique({ where: { email } });
}
