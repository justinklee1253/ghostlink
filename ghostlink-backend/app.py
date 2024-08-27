from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import assemblyai as aai
from openai import OpenAI

# Load environment variables
load_dotenv()

aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def process_video(file_path):
    """Process video using AssemblyAI and return transcription."""
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(file_path)

    if transcript.status == aai.TranscriptStatus.error:
        raise Exception(f"Transcription Error: {transcript.error}")

    return transcript.text

def generate_linkedin_post(transcription_text):
    prompt = (
        f"Given the following transcription from a video: '{transcription_text}', "
        "You are an AI ghostwriter specializing in converting content from social media videos "
        "into professional, engaging, and viral LinkedIn posts. Content creators will upload "
        "their TikTok or Instagram Reels videos, and your task is to extract the core message "
        "from the video’s text and reformat it into a compelling LinkedIn post. The post should "
        "maintain a professional tone, highlight key takeaways, include a strong call-to-action, "
        "and be optimized for LinkedIn’s audience, focusing on themes such as business insights, "
        "personal branding, leadership, and industry trends."
    )

    response = client.chat.completions.create(model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are an AI ghostwriter specializing in converting content from social media videos into LinkedIn posts."},
        {"role": "user", "content": prompt}
    ],
    max_tokens=300,
    temperature=0.7)

    linkedin_post = response.choices[0].message.content.strip()
    return linkedin_post

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'videoFile' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['videoFile']

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # Save the file locally
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(file_path)

        # Process the video and get transcription
        transcription_text = process_video(file_path)

        # Generate LinkedIn post
        linkedin_post = generate_linkedin_post(transcription_text)

        return jsonify({
            "transcription_text": transcription_text,
            "linkedin_post": linkedin_post
        }), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred during processing"}), 500

    finally:
        # Clean up the local file after processing
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True, port=4000)
