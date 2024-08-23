from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This should allow requests from your frontend

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400
    
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    
    return jsonify({
        "message": "File uploaded successfully",
        "file_name": file.filename,
        "file_size": os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Ensure it's running on port 5000 or change it to 8000 if needed