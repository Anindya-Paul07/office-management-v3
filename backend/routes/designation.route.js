import express from 'express';
import {
  createDesignation,
  getDesignations,
  assignDesignation,
  deleteDesignation,
} from '../controllers/designation.cont.js';

const router = express.Router();

router.post('/', createDesignation);
router.get('/', getDesignations);
router.put('/:id', assignDesignation);
router.delete('/:id', deleteDesignation);

export default router;
