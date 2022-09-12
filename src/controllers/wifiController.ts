import { Request, Response } from "express";
import { Wifi, WifiBodyData } from "../types/wifiTypes";
import * as wifiService from "../services/wifiService";

export async function create(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const wifiData: WifiBodyData = req.body;

  await wifiService.create(wifiData, tokenPayload.email);

  res.status(201).send("Wi-fi network created");
}

export async function getUserWifiNetworks(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;

  const wifiNetworks: any = await wifiService.getUserWifiNetworks(
    tokenPayload.email
  );

  res.status(200).send(wifiNetworks);
}

export async function getWifiNetworkById(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const wifiId = Number(id);

  const userWifi: Wifi = await wifiService.getUserWifiNetworkById(
    wifiId,
    tokenPayload.email
  );

  res.status(200).send(userWifi);
}

export async function remove(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const wifiId = Number(id);

  await wifiService.remove(wifiId, tokenPayload.email);

  res.status(200).send("Wi-fi network removed");
}
