import express from 'express';
import { createDioNote, getDioNotes } from '../controllers/dioNoteController.js';

const router = express.Router();

router.post('/', createDioNote);
router.get('/', getDioNotes);

export default router; 