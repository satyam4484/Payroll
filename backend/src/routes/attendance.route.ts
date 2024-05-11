import express from 'express';

import { markAttendance, getTodayAttendance,generateAttendanceExcel } from '../controllers/attendance.controller';

const router = express.Router();

// Route to mark attendance
router.post('/mark', markAttendance);

// Route to get today's attendance for a user
router.get('/today/:id', getTodayAttendance);


router.post('/sheet', generateAttendanceExcel);



export default router;
