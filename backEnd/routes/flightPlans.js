import express from 'express';
import { getFlightPlans } from '../controllers/flightPlanController.js';

const router = express.Router();
router.post('/', getFlightPlans);
export default router;
