// ========================================
// CYPHORA - CASE INVESTIGATION
// ========================================


// ========================================
// LOAD CASE DETAILS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    loadCaseDetails();

});


// ========================================
// GET CASE ID FROM URL
// ========================================

function loadCaseDetails() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const caseId =
        urlParams.get("id");


    if (!caseId) {

        showCaseError();

        return;
    }


    fetch(`/cases/${caseId}`)

        .then(response => {

            if (!response.ok) {

                throw new Error("Case not found");

            }

            return response.json();

        })

        .then(caseData => {

            displayCase(caseData);

        })

        .catch(error => {

            console.error(error);

            showCaseError();

        });

}


// ========================================
// DISPLAY CASE
// ========================================

function displayCase(caseData) {

    document.getElementById("caseTitle").textContent =
        caseData.title;


    document.getElementById("caseId").textContent =
        "#" + caseData.id;


    document.getElementById("caseLocation").textContent =
        caseData.location;


    document.getElementById("caseStatus").textContent =
        caseData.status;


    document.getElementById("caseDescription").textContent =
        getCaseDescription(caseData.id);

}


// ========================================
// CASE DESCRIPTIONS
// ========================================

function getCaseDescription(caseId) {

    if (caseId == 1) {

        return "A suspicious login was detected in the Computer Lab during the early hours of the morning. Sensitive student records were accessed shortly afterwards.";

    }


    if (caseId == 2) {

        return "A laptop has disappeared from Hostel Block A. Investigate the digital traces and determine what happened.";

    }


    if (caseId == 3) {

        return "A user's identity appears to have been compromised. Examine the available evidence to uncover the source of the attack.";

    }


    return "A digital investigation is currently underway. Examine the available evidence and uncover the truth.";

}


// ========================================
// START INVESTIGATION
// ========================================

function startInvestigation() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const caseId =
        urlParams.get("id");


    if (!caseId) {

        alert("Case information is missing.");

        return;
    }


    window.location.href =
        `evidence.html?id=${caseId}`;

}


// ========================================
// ERROR
// ========================================

function showCaseError() {

    document.getElementById("caseTitle").textContent =
        "Case Not Found";


    document.getElementById("caseDescription").textContent =
        "Unable to retrieve this investigation.";

}