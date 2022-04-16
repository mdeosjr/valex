import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargesRepository from '../repositories/rechargeRepository.js';
import dayjs from 'dayjs';

export async function recharge(cardId: number, amount: number) {
    const card = await cardRepository.findById(cardId);
	if (!card) throw { type: 'nonexistent card', message: 'The card is not registered'};

	if (dayjs().format('MM/YY') > card.expirationDate) throw { type: 'expired card', message: 'The card is expired' }; 

    await rechargesRepository.insert({ cardId, amount }); 
}
