import axios from 'axios';

export const getEvents = async (req, res) => {
    console.log("✅ /api/events aangeroepen!");

    // Debug log om te zien welke URL gebruikt wordt
    const apiUrl = `${process.env.API_URL}/get-all-events`;
    console.log("🔍 API-aanroep naar:", apiUrl);

    try {
        const response = await axios.post(apiUrl, req.body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("❌ API-fout:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};
