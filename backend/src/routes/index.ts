import express from "express";
const router = express.Router();

import categoryRouter from './category.route';
import userRouter from './user.route';


router.use('/category',categoryRouter);
router.use('/user',userRouter);

export default router;
