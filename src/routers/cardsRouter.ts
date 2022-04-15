import { Router } from 'express';
import * as cardsController from '../controllers/cardsController.js';
import validateSchema from '../middlewares/validadeSchema.js';
import cardSchema from '../schemas/cardSchema.js';

const cardRouter = Router();

cardRouter.post('/cards', validateSchema(cardSchema), cardsController.createCard);

export default cardRouter;