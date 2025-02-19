export const fetchApiConfig = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/config");
        if (!response.ok) throw new Error(`Server gaf fout: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Fout bij ophalen API-config:", error);
    }
};

export const fetchEvents = async (apiKey, startDate, endDate) => {
    try {
        const response = await fetch("http://localhost:3000/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
            body: JSON.stringify({
                timezone: "Europe/Brussels",
                filter: {
                    inDateRange: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString()
                    }
                }
            })
        });

        if (!response.ok) throw new Error(`Server gaf fout: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Fout bij ophalen data:", error);
    }
};

export const fetchFlightPlans = async (apiKey) => {
    try {
        const response = await fetch("http://localhost:3000/api/flight-plans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
            body: JSON.stringify({})
        });

        const data = await response.json();
        console.log("📡 API Response voor Flight Plans:", data); // 🔍 Debug-log

        return data?.data?.data || []; // ✅ FIX: Pak de array uit `data.data`
        
    } catch (error) {
        console.error("❌ Fout bij ophalen Flight Plans:", error);
    }
};

export const fetchGradingSheets = async (apiKey) => {
    try {
        const body = {
            plannedTrainingEventId: "Hd7kTp8KiStsowzkZ",
            studentUserId: "2HfCqqT4rWSdmi85F"
        };

        console.log("📡 Verstuurde body naar backend:", body);

        const response = await fetch("http://localhost:3000/api/grading-sheets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error(`Server gaf fout: ${response.status}`);

        const data = await response.json();
        console.log("📡 API Response voor Grading Sheets:", data);

        return data?.data?.gradingItems || []; // ✅ FIX: Gebruik de juiste array
    } catch (error) {
        console.error("❌ Fout bij ophalen Grading Sheets:", error);
        return [];
    }
};

