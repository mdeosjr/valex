import { Request, Response } from "express";
import * as cardsServices from "../services/cardsService.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const key = req.headers['x-api-key'];
    const apiKey = key as string;
    const { id, type } = req.body;
    const cardType = type as TransactionTypes;

    if (!apiKey) { throw { type: "invalid key", message: "Invalid api key"} }

    const cardCVV = await cardsServices.create(id, cardType, apiKey);

    res.send(cardCVV).status(201);
}