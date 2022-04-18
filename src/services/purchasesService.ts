import bcrypt from 'bcrypt';
import * as validations from "../utils/cardsValidations.js";
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';
import { totalBalance } from '../services/cardsService.js';

export async function purchase(cardId: number, password: string, businessId: number, amount: number) {
    const card = await validations.validateExpiration(cardId);

    if (!bcrypt.compareSync(password, card.password)) throw { type: 'incorrect password', message: 'Incorrect password' };

    const business = await businessRepository.findById(businessId);
    if (!business) throw { type: 'nonexistent business', message: 'The establishment is not registered' };

    if (business.type !== card.type) throw { type: 'wrong type', message: 'The card does not belong to this business' };

    const { balance } = await totalBalance(cardId);
    if (balance < amount) { throw { type: 'unavailable balance', message: 'Purchase denied!'} };

    await paymentRepository.insert({ cardId, businessId, amount })
}