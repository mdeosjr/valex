import { Router } from 'express';
import validateSchema from '../middlewares/validadeSchema.js';
import rechargeSchema from '../schemas/rechargeSchema.js'
import * as rechargesController from '../controllers/rechargesController.js';

const rechargesRouter = Router();

rechargesRouter.put('/recharges/:cardId', validateSchema(rechargeSchema), rechargesController.rechargeCard);

export default rechargesRouter;