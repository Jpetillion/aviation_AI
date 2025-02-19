import axios from 'axios';

export const getGradingSheets = async (req, res) => {
    console.log("📡 /api/grading-sheets aangeroepen!");
    
    // 🔍 Debugging: Bekijk de request-body die de backend ontvangt
    console.log("📡 Ontvangen body van frontend:", JSON.stringify(req.body, null, 2));

    try {
        const response = await axios.post(`${process.env.API_URL}/grading/grading-sheet`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.API_KEY
            }
        });

        console.log("✅ API Response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Fout bij ophalen Grading Sheets:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};
