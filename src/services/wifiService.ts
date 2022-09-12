import { Wifi, WifiBodyData } from "../types/wifiTypes";
import * as wifiRepository from "../repositories/wifiRepository";
import * as userRepository from "../repositories/userRepository";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export async function create(wifiData: WifiBodyData, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);

  await checkTitle(wifiData.title, user.id);

  const password: string = encryptPassword(wifiData.password);
  const userId: number = user.id;

  await wifiRepository.insert({ ...wifiData, userId, password });
}

export async function getUserWifiNetworks(userEmail: string): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const userWifiNetworks: any = await getWifiNetworksByUserId(user.id);

  checkUserWifiNetworks(userWifiNetworks);

  const decryptedUserWifiNetworks: any =
    decryptUserWifiNetworks(userWifiNetworks);

  return decryptedUserWifiNetworks;
}

export async function getUserWifiNetworkById(
  id: number,
  userEmail: string
): Promise<any> {
  const user: any = await getUserByEmail(userEmail);
  const wifi: Wifi = await getWifiNetworkById(id);

  checkWifiNetwork(wifi);
  checkWifiNetworkOwner(user.id, wifi.userId);

  const decryptedWifi = {
    ...wifi,
    password: cryptr.decrypt(wifi.password),
  };

  return decryptedWifi;
}

export async function remove(id: number, userEmail: string) {
  const user: any = await getUserByEmail(userEmail);
  const wifi: Wifi = await getWifiNetworkById(id);

  checkWifiNetwork(wifi);
  checkWifiNetworkOwner(user.id, wifi.userId);

  await deleteWifiNetwork(id);
}

async function checkTitle(title: string, userId: number) {
  const wifiWithTitle: any = await getWifiByTitleAndUserId(title, userId);

  if (wifiWithTitle)
    throw {
      type: "Conflict",
      message: `User already has a wifi network with title ${title}`,
    };
}

async function getUserByEmail(email: string): Promise<any> {
  return await userRepository.findByEmail(email);
}

async function getWifiByTitleAndUserId(
  title: string,
  userId: number
): Promise<any> {
  return await wifiRepository.findByTitleAndUserId(title, userId);
}

function encryptPassword(password: string): string {
  return cryptr.encrypt(password);
}

async function getWifiNetworksByUserId(userId: number): Promise<any> {
  return await wifiRepository.findByUserId(userId);
}

function decryptUserWifiNetworks(userWifiNetworks: any): any {
  return userWifiNetworks.map((wifiNetwork: Wifi) => {
    const decryptedWifiNetwork: Wifi = { ...wifiNetwork };
    decryptedWifiNetwork.password = cryptr.decrypt(wifiNetwork.password);

    return decryptedWifiNetwork;
  });
}

function checkUserWifiNetworks(wifiNetworks: any) {
  if (!wifiNetworks)
    throw {
      type: "Not Found",
      message: "User has no wi-fi networks registered",
    };
}

async function getWifiNetworkById(id: number): Promise<any> {
  return await wifiRepository.findById(id);
}

function checkWifiNetwork(wifi: Wifi) {
  if (!wifi) throw { type: "Not Found", message: "Wi-fi network id not found" };
}

function checkWifiNetworkOwner(userId: number, wifiUserId: number) {
  if (userId !== wifiUserId)
    throw {
      type: "Not Found",
      message: "Wi-fi network not found in your registries",
    };
}

async function deleteWifiNetwork(id: number) {
  await wifiRepository.remove(id);
}
