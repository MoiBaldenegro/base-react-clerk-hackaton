import { Router } from 'express';
import { createRoom, getRoom } from '../controllers/room.controller.js';

const router = Router();

router.post('/rooms', createRoom);
router.get('/rooms/:roomId', getRoom);

export default router;
