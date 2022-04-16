import joi from 'joi';

const rechargeSchema = joi.object({
    amount: joi.number().min(1).required()
});

export default rechargeSchema;