import { Router } from 'express';
import * as cardsController from '../controllers/cardsController.js';
import validateSchema from '../middlewares/validadeSchema.js';
import cardSchema from '../schemas/cardSchema.js';
import activationCardSchema from '../schemas/activationCardSchema.js'

const cardRouter = Router();

cardRouter.post('/cards/create', validateSchema(cardSchema), cardsController.createCard);
cardRouter.put('/cards/activate', validateSchema(activationCardSchema), cardsController.activateCard)

export default cardRouter;