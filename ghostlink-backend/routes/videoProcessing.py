import logging
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from transcribeScripts.assemblyTranscribe import process_video
from postGeneration.generatePost4o import generate_linkedin_post_4o
from postGeneration.generatePost4oMini import generate_linkedin_post_mini

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

video_bp = Blueprint('video_bp', __name__)

UPLOAD_FOLDER = 'uploads/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@video_bp.route('/upload', methods=['POST'])
def upload_file():

    logger.info("Hit the /upload route")
    if 'videoFile' not in request.files:
        logger.warning("No file part in the request")
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['videoFile']

    if file.filename == '':
        logger.warning("No file selected for uploading")
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # Save the file locally
        file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
        file.save(file_path)
        logger.info(f"File saved: {file_path}")

        # Process the video and get transcription
        transcription_text = process_video(file_path)

        # Generate LinkedIn post for GPT-4o
        linkedin_post_4o = generate_linkedin_post_4o(transcription_text)

        # Generate LinkedIn post for GPT-4o-mini
        linkedin_post_4o_mini = generate_linkedin_post_mini(transcription_text)

        return jsonify({
            "transcription_text": transcription_text,
            "linkedin_post_4o": linkedin_post_4o,
            "linkedin_post_4o_mini": linkedin_post_4o_mini
        }), 200

    except Exception as e:
        logger.error(f"An error occurred during processing: {e}")
        return jsonify({"error": "An error occurred during processing"}), 500

    finally:
        # Clean up the local file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            logger.info(f"Deleted file: {file_path}")
