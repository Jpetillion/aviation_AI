import express from 'express';
import { getEvents } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', getEvents);
router.get('/', (req, res) => {
    res.status(405).json({ error: "Gebruik POST voor dit endpoint." });
});

export default router;
