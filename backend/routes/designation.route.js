import express from 'express';
import {
  createDesignation,
  getDesignations,
  assignDesignation,
  deleteDesignation,
  updateDesignation
} from '../controllers/designation.cont.js';

const router = express.Router();

router.post('/', createDesignation);
router.get('/', getDesignations);
router.put('/:id', updateDesignation);
router.delete('/:id', deleteDesignation);
router.put('/assign/:employeeId', assignDesignation);


export default router;
