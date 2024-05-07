import express from "express";
const router = express.Router();

import categoryRouter from './category.route';


router.use('/category',categoryRouter);

export default router;
