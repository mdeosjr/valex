import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargesRepository from "../repositories/rechargeRepository.js";
import * as validations from "../utils/cardsValidations.js";
import { findById } from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function create(id: number, type: cardRepository.TransactionTypes, apiKey: string) {
    await validations.validateCompany(apiKey);

    const employee = await findById(id);
    if (!employee) throw { type: 'invalid employee', message: 'Employee does not exist' } 

    const employeeCard = await cardRepository.findByTypeAndEmployeeId(type, id);
    if (employeeCard) throw { type: 'existent card', message: 'The user already has a card of this type' } 

    const { cardInfo, securityCode } = generateCardInfo(employee.fullName, employee.id, type);

    await cardRepository.insert(cardInfo);
    return { securityCode };
}   

function generateCardInfo(
	fullName: string,
	id: number,
	type: cardRepository.TransactionTypes
) {
	const cardNumber = faker.finance.creditCardNumber('mastercard');
	const securityCode = faker.finance.creditCardCVV();
	const nameArray = fullName.toUpperCase().split(' ');
	const cardholderName = createCardholderName(nameArray);
	const expirationDate = dayjs().add(5, 'y').format('MM/YY');

	const cardInfo = {
		employeeId: id,
		number: cardNumber,
		cardholderName,
		securityCode: bcrypt.hashSync(securityCode, 8),
		expirationDate,
		password: null,
		isVirtual: false,
		originalCardId: null,
		isBlocked: false,
		type: type,
	};

	return { cardInfo, securityCode };
}

function createCardholderName(nameArray: string[]) {
	for (let i = 1; i <= nameArray.length - 2; i++) {
		if (nameArray[i].length <= 2) {
			nameArray.splice(i, 1);
		} else {
			nameArray[i] = nameArray[i].substring(0, 1);
		}
	}

	return nameArray.join(' ');
}

export async function activate(id: number, CVC: string, password: string) {
    await validations.validateActivation(id, CVC);

	const hashPassword = bcrypt.hashSync(password, 8)
    await cardRepository.update(id, { password: hashPassword })
}

export async function totalBalance(id: number) {
	await validations.validateCard(id);

	const transactions = await paymentRepository.findByCardId(id);
	const recharges =  await rechargesRepository.findByCardId(id);

	const transactionsTotal = generateTotal(transactions);
	const rechargesTotal = generateTotal(recharges);
	
	return {
		balance: rechargesTotal - transactionsTotal,
		transactions,
		recharges
	}
}

function generateTotal(movementsArray: any[]) {
	const movementsTotal = movementsArray
		.map((movement) => movement.amount)
		.reduce((curr: number, sum: number) => curr + sum, 0);

	return movementsTotal
}