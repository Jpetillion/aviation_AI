import axios from 'axios';

export const getFlightPlans = async (req, res) => {
    console.log("📡 Flight Plans ophalen...");

    try {
        const response = await axios.post(`${process.env.API_URL}/flight-plans`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("❌ Fout bij ophalen Flight Plans:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};
