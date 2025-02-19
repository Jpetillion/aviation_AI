import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Zorg dat de juiste padstructuur wordt gebruikt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// import dotenv from 'dotenv';
// dotenv.config();

import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.js';
import flightPlanRoutes from './routes/flightPlans.js';
import gradingSheetRoutes from './routes/gradingSheets.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Debug om te zien of .env geladen is
console.log("🔍 API_URL uit .env:", process.env.API_URL);
console.log("🔍 API_KEY uit .env:", process.env.API_KEY);

app.use('/api/events', eventRoutes);
app.use('/api/flight-plans', flightPlanRoutes);
app.use('/api/grading-sheets', gradingSheetRoutes);

app.get('/api/config', (req, res) => {
    res.json({
        apiUrl: process.env.API_URL,
        apiKey: process.env.API_KEY
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server draait op http://localhost:${PORT}`);
});
