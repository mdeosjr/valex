import { Router } from 'express';
import * as cardsController from '../controllers/cardsController.js';
import validateSchema from '../middlewares/validadeSchema.js';
import cardSchema from '../schemas/cardSchema.js';
import activationCardSchema from '../schemas/activationCardSchema.js'

const cardsRouter = Router();

cardsRouter.post('/cards/create', validateSchema(cardSchema), cardsController.createCard);
cardsRouter.put('/cards/:id/activate', validateSchema(activationCardSchema), cardsController.activateCard);
cardsRouter.get('/cards/:id/balance', cardsController.cardBalance);

export default cardsRouter;