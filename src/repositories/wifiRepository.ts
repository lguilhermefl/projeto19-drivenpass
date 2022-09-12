import { prisma } from "../config/database";
import { WifiInsertData } from "../types/wifiTypes";

export async function insert(wifiData: WifiInsertData) {
  await prisma.wifiNetworks.create({ data: wifiData });
}

export async function findByUserId(userId: number) {
  return await prisma.wifiNetworks.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.wifiNetworks.findUnique({
    where: { title_userId: { title, userId } },
  });
}

export async function findById(id: number) {
  return await prisma.wifiNetworks.findUnique({ where: { id } });
}

export async function remove(id: number) {
  await prisma.wifiNetworks.delete({ where: { id } });
}
