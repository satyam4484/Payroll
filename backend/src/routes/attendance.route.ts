import express from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

import { markAttendance, getTodayAttendance, getMonthlyAttendance,generateAttendanceExcel, markAttendanceFromSheet } from '../controllers/attendance.controller';

const router = express.Router();

// Route to mark attendance
router.post('/mark', markAttendance);

// Route to get today's attendance for a user
router.get('/today/:id', getTodayAttendance);
router.post('/monthly', getMonthlyAttendance);


router.post('/sheet', generateAttendanceExcel);

router.route('/mark_sheet').post(upload.single('file'), markAttendanceFromSheet);



export default router;
