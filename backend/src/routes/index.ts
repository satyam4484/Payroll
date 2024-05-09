import express from "express";
const router = express.Router();

import categoryRouter from './category.route';
import userRouter from './user.route';
import companyRouter from './company.route';
import attendanceRouter from './attendance.route';
import PayrollRouter from './payroll.route';



router.use('/category',categoryRouter);
router.use('/user',userRouter);
router.use('/company',companyRouter);
router.use('/attendance',attendanceRouter);
router.use('/payroll',PayrollRouter);

export default router;
