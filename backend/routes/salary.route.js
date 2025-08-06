import express from 'express';
import {
  createSalary,
  getSalaries
} from '../controllers/salary.cont.js';

const router = express.Router();

router.post('/', createSalary);
router.get('/', getSalaries);

export default router;
