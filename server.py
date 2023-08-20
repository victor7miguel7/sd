from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/get_products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
