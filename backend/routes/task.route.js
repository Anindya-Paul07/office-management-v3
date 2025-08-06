import express from 'express';
import {
  assignTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/task.cont.js';

const router = express.Router();

router.post('/', assignTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
