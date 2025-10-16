const buscarBtn = document.getElementById("buscarBtn");
const activoInput = document.getElementById("activoInput");
const noticiasContainer = document.getElementById("noticiasContainer");
const topNoticiasContainer = document.getElementById("topNoticiasContainer");

// --- Función para crear card ---
function crearCard(noticia, tipo) {
    const card = document.createElement("div");
    card.className = "card";
    
    const tipoSpan = document.createElement("span");
    tipoSpan.className = `tipo ${tipo}`;
    tipoSpan.textContent = tipo === "oficial" ? "Oficial" : "Agregada";

    const titulo = document.createElement("h3");
    titulo.textContent = noticia.titulo;

    const enlace = document.createElement("a");
    enlace.href = noticia.url;
    enlace.target = "_blank";
    enlace.textContent = "Leer noticia";

    card.appendChild(tipoSpan);
    card.appendChild(titulo);
    card.appendChild(enlace);

    return card;
}

// --- Buscar noticias de un activo ---
buscarBtn.addEventListener("click", async () => {
    const activo = activoInput.value.trim();
    if (!activo) return;

    noticiasContainer.innerHTML = "Cargando...";
    try {
        const res = await fetch(`http://127.0.0.1:5000/noticias?activo=${activo}`);
        const data = await res.json();

        noticiasContainer.innerHTML = "";
        data.forEach(n => {
            // Distinción: si tiene "autor" es oficial
            const tipo = n.autor ? "oficial" : "agregada";
            noticiasContainer.appendChild(crearCard(n, tipo));
        });
    } catch (err) {
        noticiasContainer.innerHTML = "Error al cargar noticias";
    }
});

// --- Portada top noticias del día ---
async function cargarTopNoticias() {
    topNoticiasContainer.innerHTML = "Cargando...";
    try {
        const res = await fetch(`http://127.0.0.1:5000/portada`);
        const data = await res.json();

        topNoticiasContainer.innerHTML = "";
        data.forEach(n => {
            const tipo = n.autor ? "oficial" : "agregada";
            topNoticiasContainer.appendChild(crearCard(n, tipo));
        });
    } catch (err) {
        topNoticiasContainer.innerHTML = "Error al cargar top noticias";
    }
}

// Inicializar portada
cargarTopNoticias();
