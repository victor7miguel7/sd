from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def get_products():
    return "teste"

if __name__ == '__main__':
    app.run(debug=True)
