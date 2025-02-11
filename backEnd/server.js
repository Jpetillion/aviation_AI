import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔹 Endpoint om API-instellingen op te halen
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: process.env.API_URL, 
    apiKey: process.env.API_KEY  
  });
});

// 🔹 Proxy endpoint om data van externe API op te halen
app.post('/api/get-all-events', async (req, res) => {
    try {
      console.log("🔑 Verstuurde API-key naar externe API:", process.env.API_KEY);
      console.log("📡 Verstuurde body naar API:", JSON.stringify(req.body, null, 2));
  
      const response = await axios.post(process.env.API_URL, req.body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.API_KEY 
        }
      });
  
      console.log("✅ API response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("❌ API-fout:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });  

app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}`);
});
