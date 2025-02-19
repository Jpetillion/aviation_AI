let apiUrl = "";
let apiKey = "";

console.log("✅ script.js is geladen!");

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() -25);
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 25);

// 🔹 Haal API-config op bij het laden van de pagina
async function fetchApiConfig() {
    console.log("🔄 fetchApiConfig() gestart...");
    try {
        const response = await fetch("http://localhost:3000/api/config");

        if (!response.ok) {
            throw new Error(`Server gaf fout: ${response.status} ${response.statusText}`);
        }

        const config = await response.json();
        console.log("✅ API-config geladen:", config);

        apiUrl = config.apiUrl;
        apiKey = config.apiKey;

        console.log("🔄 Start getData()...");
        getData();
    } catch (error) {
        console.error("❌ Fout bij ophalen API-config:", error);
    }
}

// 🔹 Haal data op van de externe API via de backend
async function getData() {
    console.log("🔄 getData() gestart...");
    if (!apiUrl || !apiKey) {
        console.error("❌ API-config niet geladen, stop met uitvoeren.");
        return;
    }

    console.log("📡 API request naar:", "http://localhost:3000/api/events");
    console.log("🔑 API-key:", apiKey);
    console.log("📅 Startdatum:", startDate.toISOString(), "Einddatum:", endDate.toISOString());

    try {
        const response = await fetch("http://localhost:3000/api/events", { 
            method: "POST",
            body: JSON.stringify({
                timezone: "Europe/Brussels",
                filter: {
                    inDateRange: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                    }
                }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
        });

        if (!response.ok) {
            throw new Error(`Server gaf fout: ${response.status} ${response.statusText}`);
        }

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

async function fetchFlightPlans() {
    console.log("📡 Flight Plans ophalen...");
    
    try {
        const response = await fetch('http://localhost:3000/api/flight-plans', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
            body: JSON.stringify({}) // Leeg object als er geen data nodig is
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("✅ Flight Plans opgehaald:", data);
        displayFlightPlans(data);
    } catch (error) {
        console.error("❌ Fout bij ophalen Flight Plans:", error);
    }
}

function displayFlightPlans(data) {
    const flightPlanList = document.getElementById("flightPlans");
    
    if (!flightPlanList) {
        console.error("❌ Element met id 'flightPlans' niet gevonden!");
        return;
    }

    flightPlanList.innerHTML = ""; // Leegmaken voor nieuwe data

    if (!data || data.length === 0) {
        flightPlanList.innerHTML = "<li>Geen Flight Plans gevonden.</li>";
        return;
    }

    data.forEach(plan => {
        const li = document.createElement("li");
        li.textContent = `📅 ${plan.date} | ✈️ ${plan.aircraft} | 👨‍✈️ ${plan.student}`;
        flightPlanList.appendChild(li);
    });
}

// 🚀 Laad de Flight Plans bij het openen van de pagina
fetchFlightPlans();