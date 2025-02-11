let apiUrl = "";
let apiKey = "";

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() -25);
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1);

// 🔹 Haal API-config op bij het laden van de pagina
async function fetchApiConfig() {
    try {
        const response = await fetch("http://localhost:3000/api/config");
        const config = await response.json();

        apiUrl = config.apiUrl;
        apiKey = config.apiKey; 
        console.log("✅ API-config geladen:", apiUrl, "🔑: ", apiKey);
        getData(); 
    } catch (error) {
        console.error("❌ Fout bij ophalen API-config:", error);
    }
}

// 🔹 Haal data op van de externe API via de backend
async function getData() {
    if (!apiUrl || !apiKey) {
        console.error("❌ API-config niet geladen, stop met uitvoeren.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/get-events", {
            method: "POST",
            body: JSON.stringify({
                timezone: "Europe/Brussels",
                filter: {
                    // aircrafts: ["9ocZSp6HGYCLqYZ2Y"],
                    // users: ["ugerxfAebbvLbBcF9"],
                    // recordtypes: [1],
                    inDateRange: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                    },
                },
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey, 
            },
        });

        const data = await response.json();
        console.log("✅ Data ontvangen:", JSON.stringify(data, null, 2));
        displayData(data);
    } catch (error) {
        console.error("❌ Fout bij ophalen data:", error);
    }
};

// 🔹 Toon de data in de HTML
function displayData(data) {
    if (!data.data || data.data.length === 0) {
        console.log("❌ Geen events gevonden.");
        return;
    }

    const eventList = document.getElementById("events");
    if (!eventList) {
        console.error("❌ Element met id 'events' niet gevonden in de HTML!");
        return;
    }

    eventList.innerHTML = "";
    data.data.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event.title || "Geen titel";
        eventList.appendChild(li);
    });
};

// 🚀 Start het ophalen van de API-config zodra de pagina geladen is
fetchApiConfig();
