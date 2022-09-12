import { Request, Response } from "express";
import { Credential, CredentialBodyData } from "../types/credentialTypes";
import * as credentialService from "../services/credentialService";

export async function create(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const credentialData: CredentialBodyData = req.body;

  await credentialService.create(credentialData, tokenPayload.email);

  res.status(201).send("Credential created");
}

export async function getUserCredentials(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;

  const userCredentials: any = await credentialService.getUserCredentials(
    tokenPayload.email
  );

  res.status(200).send(userCredentials);
}

export async function getCredentialById(
  req: Request,
  res: Response
): Promise<any> {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const credentialId = Number(id);

  const userCredential: Credential =
    await credentialService.getUserCredentialById(
      credentialId,
      tokenPayload.email
    );

  res.status(200).send(userCredential);
}

export async function remove(req: Request, res: Response) {
  const tokenPayload: any = res.locals.payload;
  const { id } = req.params;
  const credentialId = Number(id);

  await credentialService.remove(credentialId, tokenPayload.email);

  res.status(200).send("Credential removed");
}
