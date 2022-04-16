import joi from 'joi';

const activationCardSchema = joi.object({
    CVC: joi.string().length(3).required(),
    password: joi.string().length(4).required()
});

export default activationCardSchema;