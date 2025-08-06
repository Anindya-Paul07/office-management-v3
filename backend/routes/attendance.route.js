import express from 'express';
import {
  markAttendance,
  getAttendance,
  getAttendanceByDate
} from '../controllers/attendance.cont.js';

const router = express.Router();

router.post('/', markAttendance);
router.get('/', getAttendance);
router.get('/date', getAttendanceByDate);

export default router;