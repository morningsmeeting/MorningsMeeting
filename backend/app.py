from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Servidor MorningsMeeting funcionando correctamente 🚀"

if __name__ == '__main__':
    app.run(debug=True)
