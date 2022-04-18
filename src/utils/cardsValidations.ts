import { findByApiKey } from '../repositories/companyRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function validateCompany(apiKey: string) {
    const company = await findByApiKey(apiKey);
	if (!company) throw { type: 'invalid company', message: 'Company does not exist' }; 
}

export async function validateCard(id: number) {
    const card = await cardRepository.findById(id);
	if (!card) throw { type: 'nonexistent card', message: 'The card is not registered' };

    return card;
}

export async function validateExpiration(id: number) {
    const card = await validateCard(id);

    if (dayjs().format('MM/YY') > card.expirationDate) throw { type: 'expired card', message: 'The card is expired' };

    return card;
}

export async function validateActivation(id: number, CVC: string) {
    const card = await validateExpiration(id);

    if (card.password !== null) throw { type: 'activated card', message: 'The card is already activated' }

    if (!bcrypt.compareSync(CVC, card.securityCode)) throw { type: 'incorrect CVC', message: 'Incorrect CVC' }
}

