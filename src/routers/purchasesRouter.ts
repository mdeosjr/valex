import { Router } from 'express';
import * as purchasesController from '../controllers/purchasesController.js';
import validateSchema from '../middlewares/validadeSchema.js';
import purchaseSchema from '../schemas/purchaseSchema.js';

const purchasesRouter = Router();

purchasesRouter.put('/purchases/:cardId', validateSchema(purchaseSchema), purchasesController.createPurchase)

export default purchasesRouter;