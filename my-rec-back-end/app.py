from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    print(data)  # Process this data as needed
    return jsonify({"message": "Data received"})

if __name__ == "__main__":
    app.run(debug=True)
