import * as validations from '../utils/cardsValidations.js';
import * as rechargesRepository from '../repositories/rechargeRepository.js';

export async function recharge(cardId: number, amount: number) {
	await validations.validateExpiration(cardId);
    
    await rechargesRepository.insert({ cardId, amount });
}
