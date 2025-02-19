import express from 'express';
import { getGradingSheets } from '../controllers/gradingSheetController.js';

const router = express.Router();
router.post('/', getGradingSheets);
export default router;
