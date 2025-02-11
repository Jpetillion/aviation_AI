let apiUrl = "";
let apiKey = "";

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() -25);
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 25);

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
        const response = await fetch("http://localhost:3000/api/get-all-events", {
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
    
        // Zet starttijd om naar een leesbaar formaat
        const startDate = event.start ? new Date(event.start) : null;
        const formattedStart = startDate ? startDate.toLocaleString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }) : "Geen startdatum";
    
        // Haal uitgenodigde gebruikers op
        const invitedUsers = event.record?.invitedUsers?.includedUsers || [];
        const invitedText = invitedUsers.length > 0 ? invitedUsers.join(", ") : "Geen uitgenodigde gebruikers";
    
        li.innerHTML = `
            <p><strong>${event.title || "Geen titel"}</strong></p>
            <p><strong>Start:</strong> ${formattedStart}</p>
            <p><strong>Uitgenodigde gebruikers:</strong> ${invitedText}</p>
        `;
    
        eventList.appendChild(li);
    });    
};

fetchApiConfig();
