import { Request, Response } from 'express';
import * as purchasesServices from '../services/purchasesService.js';

export async function createPurchase(req: Request, res: Response) {
    const { cardId } = req.params;
    const { password, businessId, amount } = req.body;

    await purchasesServices.purchase(parseInt(cardId), password, businessId, amount);

    res.sendStatus(200);
}