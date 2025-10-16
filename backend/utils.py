# utils.py — versión gratuita sin OpenAI

import feedparser
import re

# 🔹 Fuentes RSS gratuitas y legales
FUENTES_RSS = {
    "Economía (El Economista)": "https://www.eleconomista.es/rss/rss-economia.php",
    "Mercados (Expansión)": "https://e00-expansion.uecdn.es/rss/mercados.xml",
    "Internacional (Reuters)": "https://feeds.reuters.com/reuters/businessNews",
    "Criptomonedas (Cointelegraph)": "https://cointelegraph.com/rss",
    "Bolsa (Yahoo Finance)": "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^DJI"
}

def obtener_noticias():
    """Lee las fuentes RSS y devuelve una lista con las últimas noticias."""
    noticias = []
    for fuente, url in FUENTES_RSS.items():
        feed = feedparser.parse(url)
        for entrada in feed.entries[:5]:
            noticias.append({
                "fuente": fuente,
                "titulo": entrada.title,
                "link": entrada.link,
                "fecha": entrada.get("published", "Sin fecha"),
                "resumen": generar_resumen_simple(entrada.title)
            })
    return noticias


def generar_resumen_simple(texto):
    """Genera un resumen básico del titular."""
    # Eliminamos ruido (paréntesis, números, etc.)
    texto = re.sub(r"\(.*?\)|\[.*?\]", "", texto)
    texto = texto.strip()

    # Simplificamos la idea del titular
    palabras = texto.split()
    if len(palabras) > 10:
        resumen = " ".join(palabras[:10]) + "..."
    else:
        resumen = texto

    return resumen
