import express from 'express';
import {
  createDepartment,
  getDepartments,
  assignDepartment,
  deleteDepartment,
} from '../controllers/department.cont.js';

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartments);
router.put('/:id', assignDepartment);
router.delete('/:id', deleteDepartment);

export default router;
