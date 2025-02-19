import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Functie om Flight Plans op te halen
export async function getFlightPlans() {
    try {
        const response = await axios.post(`${BASE_URL}/flight-plans`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            }
        });

        console.log("✅ Flight Plans Data ontvangen:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error("❌ Fout bij ophalen Flight Plans:", error.response?.data || error.message);
        return { error: "Kan Flight Plans niet ophalen" };
    }
}
