import express from 'express';
import { bindFriend } from '../controllers/friendController.js';

const router = express.Router();

router.post('/bind', bindFriend);

export default router; 