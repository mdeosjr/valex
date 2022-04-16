import joi from 'joi';

const activationCardSchema = joi.object({
    id: joi.number().required(),
    CVC: joi.string().length(3).required(),
    password: joi.string().length(4).required()
});

export default activationCardSchema;