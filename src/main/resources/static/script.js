// ================================
// CYBERCASE - JAVASCRIPT
// ================================


// Load cases when page opens
document.addEventListener("DOMContentLoaded", function () {
    loadCases();
});


// ================================
// LOAD CASES FROM SPRING BOOT
// ================================

function loadCases() {

    fetch("/cases")
        .then(response => response.json())
        .then(cases => {
            displayCases(cases);
        })
        .catch(error => {

            console.error("Error loading cases:", error);

            document.getElementById("casesContainer").innerHTML = `
                <p class="error-message">
                    Unable to load cases. Please make sure the server is running.
                </p>
            `;
        });
}


// ================================
// DISPLAY CASES
// ================================

function displayCases(cases) {

    const container = document.getElementById("casesContainer");

    container.innerHTML = "";

    if (cases.length === 0) {

        container.innerHTML = `
            <p>No cases found.</p>
        `;

        return;
    }


    cases.forEach(caseItem => {

        const card = document.createElement("div");

        card.className = "case-card";

        card.innerHTML = `
            <h3>${caseItem.title}</h3>

            <p>
                <strong>Case ID:</strong>
                #${caseItem.id}
            </p>

            <p>
                <strong>Location:</strong>
                ${caseItem.location}
            </p>

            <span class="case-status">
                ${caseItem.status}
            </span>

            <button class="investigate-btn"
                    onclick="openCase(${caseItem.id})">
                Investigate Case →
            </button>
        `;

        container.appendChild(card);
    });
}


// ================================
// OPEN CASE
// ================================

function openCase(caseId) {

    window.location.href = `case.html?id=${caseId}`;
}


// ================================
// SEARCH CASES
// ================================

function searchCases() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const cards =
        document.querySelectorAll(".case-card");


    cards.forEach(card => {

        const cardText =
            card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}


// ================================
// SCROLL TO CASES
// ================================

function scrollToCases() {

    document.getElementById("cases").scrollIntoView({
        behavior: "smooth"
    });
}