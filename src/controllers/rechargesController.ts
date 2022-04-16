import { Response, Request } from 'express';
import * as rechargesServices from '../services/rechargesService.js';

export async function rechargeCard(req: Request, res: Response) {
    const key = req.headers['x-api-key'];
	const apiKey = key as string;
    const { cardId } = req.params;
    const { amount } = req.body;

    if (!apiKey) { throw { type: 'invalid key', message: 'Invalid api key' } }

    await rechargesServices.recharge(parseInt(cardId), amount)

    res.sendStatus(200);
}
