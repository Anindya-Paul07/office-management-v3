import express from 'express';
import {
  assignTask,
  getTasks,
  updateTask,
  deleteTask,
  uploadTaskAttachment
} from '../controllers/task.cont.js';

const router = express.Router();

router.post('/', uploadTaskAttachment, assignTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
