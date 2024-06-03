import express from 'express';
const router = express.Router();
import { checkIn, checkOut, getStatus } from "../controllers/checkInCheckOutController.js";



router.post('/:id/checkin', checkIn);
router.post('/:id/checkout', checkOut);
router.get('/:id/status', getStatus);

export default router;

