// ========================================
// CYPHORA - AUTHENTICATION
// ========================================


// ========================================
// SHOW REGISTER
// ========================================

function showRegister() {

    document.getElementById(
        "loginSection"
    ).style.display = "none";

    document.getElementById(
        "registerSection"
    ).style.display = "block";

}


// ========================================
// SHOW LOGIN
// ========================================

function showLogin() {

    document.getElementById(
        "registerSection"
    ).style.display = "none";

    document.getElementById(
        "loginSection"
    ).style.display = "block";

}


// ========================================
// REGISTER
// ========================================

function register() {

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    if (!name || !email || !password) {

        message.textContent =
            "Please fill in all fields.";

        return;

    }


    const investigator = {

        name: name,

        email: email,

        password: password

    };


    fetch("/auth/register", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body:
            JSON.stringify(investigator)

    })

    .then(response =>
        response.text()
    )

    .then(result => {

        message.textContent =
            result;


        if (
            result ===
            "Registration successful"
        ) {

            document.getElementById(
                "registerName"
            ).value = "";

            document.getElementById(
                "registerEmail"
            ).value = "";

            document.getElementById(
                "registerPassword"
            ).value = "";

            setTimeout(() => {

                showLogin();

            }, 1000);

        }

    })

    .catch(error => {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";

    });

}


// ========================================
// LOGIN
// ========================================

function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!email || !password) {

        message.textContent =
            "Please enter email and password.";

        return;

    }


    const investigator = {

        email: email,

        password: password

    };


    fetch("/auth/login", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body:
            JSON.stringify(investigator)

    })

    .then(response =>
        response.text()
    )

    .then(result => {

        message.textContent =
            result;


        if (
            result ===
            "Login successful"
        ) {

            localStorage.setItem(
                "cyphoraLoggedIn",
                "true"
            );

            localStorage.setItem(
                "cyphoraEmail",
                email
            );


            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 700);

        }

    })

    .catch(error => {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";

    });

}