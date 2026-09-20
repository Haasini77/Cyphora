// ========================================
// CYPHORA - EVIDENCE ROOM
// ========================================

let investigatedEvidence = new Set();
let evidenceData = [];


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    updateProgress();
    loadEvidence();
    loadSuspects();

});


// ========================================
// GET CURRENT CASE ID
// ========================================

function getCurrentCaseId() {

    const urlParams =
        new URLSearchParams(window.location.search);

    return urlParams.get("id");

}


// ========================================
// LOAD EVIDENCE FROM MONGODB
// ========================================

function loadEvidence() {

    const caseId =
        getCurrentCaseId();

    if (!caseId) {

        showEvidenceError();

        return;

    }

    fetch(`/cases/${caseId}/evidence`)
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load evidence"
                );

            }

            return response.json();

        })
        .then(evidence => {

            evidenceData = evidence;

        })
        .catch(error => {

            console.error(error);

            showEvidenceError();

        });

}


// ========================================
// VIEW EVIDENCE
// ========================================

function viewEvidence(type) {

    const panel =
        document.getElementById("evidencePanel");


    const evidence =
        evidenceData.find(item =>
            item.type === type
        );


    if (!evidence) {

        panel.innerHTML = `

            <div class="panel-placeholder">

                <div class="big-icon">
                    ⚠️
                </div>

                <h2>
                    Evidence Not Found
                </h2>

                <p>
                    This evidence could not be
                    retrieved from the investigation database.
                </p>

            </div>

        `;

        return;

    }


    investigatedEvidence.add(type);

    updateProgress();


    let icon = "🔎";

    let label = "DIGITAL FORENSICS";


    if (type === "login") {

        icon = "🔐";
        label = "DIGITAL LOG";

    }


    if (type === "ip") {

        icon = "🌐";
        label = "NETWORK FORENSICS";

    }


    if (type === "device") {

        icon = "💻";
        label = "DEVICE FORENSICS";

    }


    if (type === "files") {

        icon = "📁";
        label = "FILE FORENSICS";

    }


    panel.innerHTML = `

        <div class="panel-header">

            <span class="panel-label">
                ${label}
            </span>

            <h2>
                ${icon} ${evidence.title}
            </h2>

        </div>


        <div class="evidence-description">

            <p>
                ${evidence.description}
            </p>

        </div>


        <div class="clue-box">

            <strong>
                💡 Clue discovered
            </strong>

            <p>
                ${evidence.clue}
            </p>

        </div>

    `;


    panel.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ========================================
// EVIDENCE ERROR
// ========================================

function showEvidenceError() {

    const panel =
        document.getElementById("evidencePanel");


    panel.innerHTML = `

        <div class="panel-placeholder">

            <div class="big-icon">
                ⚠️
            </div>

            <h2>
                Unable to Load Evidence
            </h2>

            <p>
                Make sure the Spring Boot server
                is running and the case exists.
            </p>

        </div>

    `;

}


// ========================================
// LOAD SUSPECTS
// ========================================

function loadSuspects() {

    const caseId =
        getCurrentCaseId();


    if (!caseId) {

        showSuspectError();

        return;

    }


    fetch(`/cases/${caseId}/suspects`)
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load suspects"
                );

            }

            return response.json();

        })
        .then(suspects => {

            displaySuspects(suspects);

        })
        .catch(error => {

            console.error(error);

            showSuspectError();

        });

}


// ========================================
// DISPLAY SUSPECTS
// ========================================

function displaySuspects(suspects) {

    const container =
        document.getElementById(
            "suspectsContainer"
        );


    container.innerHTML = "";


    suspects.forEach(suspect => {

        const card =
            document.createElement("div");


        card.className =
            "suspect-card";


        card.innerHTML = `

            <div class="suspect-avatar">
                👤
            </div>


            <div class="suspect-main">

                <div class="suspect-top">

                    <div>

                        <h3>
                            ${suspect.name}
                        </h3>

                        <span>
                            ${suspect.role}
                        </span>

                    </div>


                    <span class="suspect-id">
                        #${suspect.id}
                    </span>

                </div>


                <div class="suspect-details">

                    <div>

                        <small>
                            DEVICE
                        </small>

                        <strong>
                            ${suspect.device}
                        </strong>

                    </div>


                    <div>

                        <small>
                            IP ADDRESS
                        </small>

                        <strong>
                            ${suspect.ipAddress}
                        </strong>

                    </div>


                    <div>

                        <small>
                            LAST SEEN
                        </small>

                        <strong>
                            ${suspect.lastSeen}
                        </strong>

                    </div>

                </div>


                <div class="statement">

                    <small>
                        STATEMENT
                    </small>

                    <p>
                        "${suspect.statement}"
                    </p>

                </div>


                <button
                    class="accuse-btn"
                    onclick="accuseSuspect(
                        ${suspect.id},
                        '${suspect.name}'
                    )">

                    ⚖️ Accuse Suspect

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// SUSPECT ERROR
// ========================================

function showSuspectError() {

    document.getElementById(
        "suspectsContainer"
    ).innerHTML = `

        <p class="error-message">

            Unable to load suspects.

            Make sure the Spring Boot
            server is running.

        </p>

    `;

}


// ========================================
// ACCUSE SUSPECT
// ========================================

function accuseSuspect(id, name) {

    const confirmed =
        confirm(
            `Are you sure you want to accuse ${name}?`
        );


    if (!confirmed) {

        return;

    }


    const caseId =
        getCurrentCaseId();


    // ========================================
    // CASE 001
    // CORRECT SUSPECT = MEERA (#2)
    // ========================================

    if (
        caseId === "1" &&
        id === 2
    ) {

        saveAndOpenResult(
            caseId,
            id,
            name
        );

        return;

    }


    // ========================================
    // CASE 002
    // CORRECT SUSPECT = KARAN (#4)
    // ========================================

    if (
        caseId === "2" &&
        id === 4
    ) {

        saveAndOpenResult(
            caseId,
            id,
            name
        );

        return;

    }


    // ========================================
    // CASE 003
    // CORRECT SUSPECT = PRIYA (#9)
    // ========================================

    if (
        caseId === "3" &&
        id === 9
    ) {

        saveAndOpenResult(
            caseId,
            id,
            name
        );

        return;

    }


    // ========================================
    // WRONG SUSPECT
    // ========================================

    const result =
        document.getElementById(
            "accusationResult"
        );


    result.innerHTML = `

        <div class="result-wrong">

            <div class="result-icon">
                ⚠️
            </div>


            <p class="result-label">
                INVESTIGATION INCOMPLETE
            </p>


            <h2>
                Evidence Does Not Match
            </h2>


            <p>

                Your accusation of

                <strong>
                    ${name}
                </strong>

                does not match the strongest
                evidence currently available.

            </p>


            <div class="reason-box">

                <h3>
                    💡 Re-examine the Evidence
                </h3>


                <p>

                    Compare the suspect's device,
                    IP address and timestamp with
                    the evidence.

                </p>

            </div>


            <div class="score wrong-score">

                SCORE: 0 / 100

            </div>

        </div>

    `;


    result.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ========================================
// SAVE RESULT
// ========================================

function saveAndOpenResult(
    caseId,
    suspectId,
    suspectName
) {

    localStorage.setItem(

        "cyphoraResult",

        JSON.stringify({

            caseId: caseId,

            suspectId: suspectId,

            suspectName: suspectName,

            score: 100,

            status: "SOLVED"

        })

    );


    window.location.href =
        `result.html?id=${caseId}`;

}


// ========================================
// UPDATE PROGRESS
// ========================================

function updateProgress() {

    const totalEvidence = 4;


    const completed =
        investigatedEvidence.size;


    const progress =
        Math.round(
            (completed / totalEvidence) * 100
        );


    document.getElementById(
        "progressText"
    ).textContent =
        progress + "%";


    document.getElementById(
        "mainProgressBar"
    ).style.width =
        progress + "%";


    const cardMap = {

        login: "loginCard",

        ip: "ipCard",

        device: "deviceCard",

        files: "filesCard"

    };


    Object.keys(cardMap).forEach(type => {

        const card =
            document.getElementById(
                cardMap[type]
            );


        if (!card) {

            return;

        }


        if (
            investigatedEvidence.has(type)
        ) {

            card.classList.add(
                "investigated"
            );

        }

    });


    if (progress === 100) {

        showCompletionMessage();

    }

}


// ========================================
// COMPLETION MESSAGE
// ========================================

function showCompletionMessage() {

    const panel =
        document.getElementById(
            "evidencePanel"
        );


    if (
        document.getElementById(
            "completionBox"
        )
    ) {

        return;

    }


    panel.innerHTML += `

        <div
            class="completion-box"
            id="completionBox">

            <div class="completion-icon">
                🎯
            </div>


            <h2>
                All Evidence Investigated
            </h2>


            <p>

                You have examined every available
                evidence source.

            </p>


            <button
                onclick="scrollToSuspects()">

                Compare Suspects →

            </button>

        </div>

    `;

}


// ========================================
// SCROLL TO SUSPECTS
// ========================================

function scrollToSuspects() {

    const board =
        document.querySelector(
            ".suspect-board"
        );


    board.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}