import joi from 'joi';

const purchaseSchema = joi.object({
    password: joi.string().required(),
    businessId: joi.number().required(),
    amount: joi.number().min(1).required()
})

export default purchaseSchema;