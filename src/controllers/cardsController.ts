import { Request, Response } from "express";
import * as cardsServices from "../services/cardsService.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const key = req.headers['x-api-key'];
    const apiKey = key as string;
    const { id, type } = req.body;
    const cardType = type as TransactionTypes;

    if (!apiKey) { throw { type: "invalid key", message: "Invalid api key"} }

    const cardCVC = await cardsServices.create(id, cardType, apiKey);

    res.send(cardCVC).status(201);
}

export async function activateCard(req: Request, res: Response) {
    const { id } = req.params;
    const { CVC, password } = req.body; 

    await cardsServices.activate(parseInt(id), CVC, password);

    res.sendStatus(200);
}

export async function cardBalance(req: Request, res: Response) {
    const { id } = req.params;

    const balance = await cardsServices.balance(parseInt(id))

    res.send(balance).status(200);
}