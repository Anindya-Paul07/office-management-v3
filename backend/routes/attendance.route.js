import express from 'express';
import {
  markAttendance,
  getAttendance
} from '../controllers/attendance.cont.js';

const router = express.Router();

router.post('/', markAttendance);
router.get('/', getAttendance);

export default router;