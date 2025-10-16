import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv

# Cargar variables de entorno local (en Render se usan variables del panel)
load_dotenv()

app = Flask(__name__)

# API Key de OpenAI desde entorno
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    print("⚠️ WARNING: OPENAI_API_KEY no encontrada en variables de entorno")

# Ruta de prueba
@app.route("/")
def home():
    return jsonify({"message": "Backend de MorningsMeeting funcionando 🚀"})

# Ruta para analizar noticias
@app.route("/noticias", methods=["POST"])
def analizar_noticia():
    data = request.json
    if not data or "texto" not in data:
        return jsonify({"error": "Debes enviar el campo 'texto'"}), 400
    
    texto = data["texto"]
    
    # Aquí va tu lógica de análisis usando OpenAI
    # Por ejemplo, placeholder de prueba
    resultado = f"Análisis de la noticia: {texto[:50]}..."
    
    return jsonify({"resultado": resultado})

# Configuración del puerto para Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render asigna el puerto
    app.run(host="0.0.0.0", port=port, debug=False)
