import express from 'express';
import {
  createDepartment,
  getDepartments,
  assignDepartment,
  deleteDepartment,
  updateDepartment
} from '../controllers/department.cont.js';

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartments);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);
router.put('/assign/:employeeId', assignDepartment);

export default router;
