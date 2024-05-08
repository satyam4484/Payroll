import express from "express";
const router = express.Router();

import categoryRouter from './category.route';
import userRouter from './user.route';
import companyRouter from './company.route';



router.use('/category',categoryRouter);
router.use('/user',userRouter);
router.use('/company',companyRouter);

export default router;
