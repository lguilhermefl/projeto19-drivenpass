import { WifiNetworks } from "@prisma/client";

export type Wifi = WifiNetworks;
export type WifiInsertData = Omit<Wifi, "id">;
export type WifiBodyData = Omit<Wifi, "id" | "userId">;
