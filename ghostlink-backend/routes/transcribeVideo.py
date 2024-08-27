import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, Blueprint
from transcribeScripts.assemblyTranscribe import processVideo
import json

transcribe_bp = Blueprint('transcribe_bp', __name__)

# Ensure the uploads directory exists
UPLOAD_FOLDER = 'temp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@transcribe_bp.route('/transcribeVideo', methods=['POST'])
def transcribe_video():
        print("\nhitting this route\n")

        try:
            if 'videoFile' not in request.files:
                return jsonify({"error": "No audio file part"}), 400

            file = request.files['videoFile']
            print(f"Received audio file: {file.filename}")

            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400

            file_path = os.path.join(UPLOAD_FOLDER, file.filename)

            # Save the file to the temporary folder
            file.save(file_path)
            print(f"File saved to {file_path}")

            try:
                # Pass the file path to the processAudio function
                result = processVideo(file_path)
                result_data = json.loads(result)

                print(f"\n\nProcessed audio result: {result}\n\n")

            finally:
                # Delete the file after processing
                if os.path.exists(file_path):
                    os.remove(file_path)
                    print(f"Deleted file: {file_path}")

        except Exception as e:
            print(f"Error processing audio: {str(e)}")
            return jsonify({"error": f"Internal server error: {str(e)}"}), 500