import joi from 'joi';

const cardSchema = joi.object({
	id: joi.number().required(),
	type: joi
		.string()
		.valid('groceries', 'restaurant', 'transport', 'education', 'health')
		.required()
});

export default cardSchema;