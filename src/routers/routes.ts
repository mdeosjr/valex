import { Router } from "express";
import cardsRouter from "./cardsRouter.js";

const router = Router();

router.use(cardsRouter);

export default router;