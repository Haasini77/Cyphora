// ========================================
// CYPHORA - INVESTIGATION REPORT
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    loadInvestigationReport();
});


// ========================================
// LOAD INVESTIGATION REPORT
// ========================================

function loadInvestigationReport() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const caseId =
        urlParams.get("id");


    if (!caseId) {

        showReportError(
            "Case information is missing."
        );

        return;
    }


    const savedResult =
        localStorage.getItem("cyphoraResult");


    if (!savedResult) {

        showReportError(
            "No completed investigation was found."
        );

        return;
    }


    let result;

    try {

        result =
            JSON.parse(savedResult);

    } catch (error) {

        showReportError(
            "Invalid investigation result."
        );

        return;
    }


    // ========================================
    // IMPORTANT:
    // MAKE SURE RESULT BELONGS TO THIS CASE
    // ========================================

    if (
        String(result.caseId) !==
        String(caseId)
    ) {

        showReportError(
            "This investigation report does not belong to this case."
        );

        return;
    }


    // ========================================
    // FETCH CASE FROM SPRING BOOT
    // ========================================

    fetch(`/cases/${caseId}`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Case not found"
                );

            }

            return response.json();

        })

        .then(caseData => {

            displayReport(
                caseData,
                result
            );

        })

        .catch(error => {

            console.error(error);

            showReportError(
                "Unable to load case information."
            );

        });
}


// ========================================
// DISPLAY REPORT
// ========================================

function displayReport(
    caseData,
    result
) {

    document.getElementById(
        "resultCase"
    ).textContent =
        caseData.title;


    document.getElementById(
        "resultLocation"
    ).textContent =
        caseData.location;


    document.getElementById(
        "resultStatus"
    ).textContent =
        result.status;


    document.getElementById(
        "resultSuspect"
    ).textContent =
        result.suspectName;


    document.getElementById(
        "resultScore"
    ).textContent =
        result.score + " / 100";


    document.getElementById(
        "resultCaseId"
    ).textContent =
        "#" + caseData.id;
}


// ========================================
// ERROR
// ========================================

function showReportError(message) {

    document.getElementById(
        "resultCase"
    ).textContent =
        "Unavailable";


    document.getElementById(
        "resultLocation"
    ).textContent =
        "Unavailable";


    document.getElementById(
        "resultStatus"
    ).textContent =
        "NOT COMPLETED";


    document.getElementById(
        "resultSuspect"
    ).textContent =
        "Not available";


    document.getElementById(
        "resultScore"
    ).textContent =
        "—";


    document.getElementById(
        "resultCaseId"
    ).textContent =
        "—";


    console.warn(message);

}