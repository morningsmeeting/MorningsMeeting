const loginBtn = document.getElementById("loginBtn");
const publicarBtn = document.getElementById("publicarBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginSection = document.getElementById("loginSection");
const publicarSection = document.getElementById("publicarSection");

const loginMsg = document.getElementById("loginMsg");
const publicarMsg = document.getElementById("publicarMsg");

let token = null;

// --- Login ---
loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) return;

    try {
        const res = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });

        const data = await res.json();

        if (res.ok) {
            token = data.access_token;
            loginSection.style.display = "none";
            publicarSection.style.display = "block";
            loginMsg.textContent = "";
        } else {
            loginMsg.textContent = data.error;
        }
    } catch (err) {
        loginMsg.textContent = "Error de conexión";
    }
});

// --- Publicar noticia ---
publicarBtn.addEventListener("click", async () => {
    const titulo = document.getElementById("titulo").value.trim();
    const url = document.getElementById("url").value.trim();

    if (!titulo || !url) return;

    try {
        const res = await fetch("http://127.0.0.1:5000/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({titulo, url})
        });

        const data = await res.json();

        if (res.ok) {
            publicarMsg.textContent = "Noticia publicada correctamente ✅";
        } else {
            publicarMsg.textContent = data.error;
        }
    } catch (err) {
        publicarMsg.textContent = "Error de conexión";
    }
});

// --- Logout ---
logoutBtn.addEventListener("click", () => {
    token = null;
    loginSection.style.display = "block";
    publicarSection.style.display = "none";
});
