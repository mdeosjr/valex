import { Router } from "express";
import cardsRouter from "./cardsRouter.js";
import rechargesRouter from "./rechargesRouter.js";

const router = Router();

router.use(cardsRouter);
router.use(rechargesRouter);

export default router;