# app.py — backend Flask gratuito
from flask import Flask, jsonify
from utils import obtener_noticias

app = Flask(__name__)

@app.route("/noticias")
def noticias():
    """Devuelve las noticias en formato JSON."""
    datos = obtener_noticias()
    return jsonify(datos)

if __name__ == "__main__":
    app.run(debug=True)
