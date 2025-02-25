import { fetchApiConfig, fetchEvents, fetchFlightPlans, fetchGradingSheets } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ Pagina geladen!");
    
    // Haal de API-config op
    const config = await fetchApiConfig();
    if (!config) return;

    // 📅 Haal Events op
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 25);
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25);

    const eventData = await fetchEvents(config.apiKey, startDate, endDate);
    console.log("📡 Ontvangen Events data:", eventData); 
    if (eventData?.data) displayEvents(eventData.data);

    // ✈️ Haal Flight Plans op
    const flightPlansData = await fetchFlightPlans(config.apiKey);
    console.log("📡 Ontvangen Flight Plans data:", flightPlansData); // 🔍 Debug-log
    
    if (flightPlansData.length > 0) {
        displayFlightPlans(flightPlansData); // ✅ Fix: direct de array doorgeven
    } else {
        console.error("❌ Geen Flight Plans gevonden of ongeldige data ontvangen.");
    }

    // 📝 Haal Grading Sheets op
    const gradingSheetsData = await fetchGradingSheets(config.apiKey);
    console.log("📡 Ontvangen Grading Sheets data:", gradingSheetsData); // ✅ Extra debug-log

    if (gradingSheetsData.length > 0) {
        console.log("✅ displayGradingSheets wordt aangeroepen met:", gradingSheetsData);
        displayGradingSheets(gradingSheetsData);
    } else {
        console.error("❌ Geen Grading Sheets gevonden of ongeldige data ontvangen.");
    }

});

// 🎨 Events weergeven
function displayEvents(events) {
    const eventList = document.getElementById("eventsList");
    if (!eventList) return console.error("❌ Element met id 'eventsList' niet gevonden!");

    eventList.innerHTML = "";
    if (events.length === 0) {
        eventList.innerHTML = "<li>Geen events gevonden.</li>";
        return;
    }

    events.forEach(event => {
        const li = document.createElement("li");
        li.classList.add("event-item");

        const startDate = new Date(event.start);
        const endDate = new Date(event.end);

        const formattedStart = startDate.toLocaleString("nl-NL", {
            day: "numeric", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });

        const formattedEnd = endDate.toLocaleString("nl-NL", {
            hour: "2-digit", minute: "2-digit"
        });

        li.innerHTML = `
            <p><strong>${event.title || "Geen titel"}</strong></p>
            <p><strong>Start:</strong> ${formattedStart} - <strong>Einde:</strong> ${formattedEnd}</p>
            <p><strong>Kleurcode:</strong> <span style="background-color: ${event.backgroundColor}; padding: 2px 10px; border-radius: 5px;">${event.backgroundColor}</span></p>
        `;
        eventList.appendChild(li);
    });
}

// ✈️ Flight Plans weergeven
function displayFlightPlans(flightPlans) {
    const list = document.getElementById("flightPlansList");
    if (!list) return console.error("❌ Element met id 'flightPlansList' niet gevonden!");

    list.innerHTML = "";
    if (flightPlans.length === 0) {
        list.innerHTML = "<li>Geen Flight Plans gevonden.</li>";
        return;
    }

    flightPlans.forEach(plan => {
        const li = document.createElement("li");
        li.classList.add("flight-plan-item");

        li.innerHTML = `
            <p><strong>Vlucht type:</strong> ${plan.type || "Onbekend"}</p>
            <p><strong>Student:</strong> ${plan.userId || "Onbekend"}</p>
            <p><strong>Datum:</strong> ${new Date(plan.startDate).toLocaleDateString("nl-NL")}</p>
        `;
        list.appendChild(li);
    });
}

function displayGradingSheets(gradingSheets) {
    const list = document.getElementById("gradingSheetsList");

    if (!list) {
        console.error("❌ Element met id 'gradingSheetsList' niet gevonden in de DOM!");
        return;
    }

    console.log("📡 Rendering Grading Sheets:", gradingSheets); // ✅ Log alle grading items

    list.innerHTML = "";
    if (!gradingSheets || gradingSheets.length === 0) {
        list.innerHTML = "<li>Geen Grading Sheets gevonden.</li>";
        console.error("❌ Geen Grading Sheets ontvangen.");
        return;
    }

    gradingSheets.forEach(sheet => {
        console.log("📄 Grading Sheet:", sheet); // ✅ Log elk grading item

        const li = document.createElement("li");
        li.classList.add("grading-sheet-item");

        li.innerHTML = `
            <p><strong>Training Item ID:</strong> ${sheet.trainingItemId || "Onbekend"}</p>
            <p><strong>Training Event Item ID:</strong> ${sheet.trainingEventItemId || "Onbekend"}</p>
            <p><strong>Status:</strong> ${sheet.viewed ? "Bekeken" : "Niet bekeken"}</p>
        `;
        list.appendChild(li);
    });

    console.log("✅ Grading Sheets toegevoegd aan HTML!");
}

