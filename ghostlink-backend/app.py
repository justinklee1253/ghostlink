from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import moviepy.editor as mp
import speech_recognition as sr

app = Flask(__name__)
CORS(app)

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
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Extract audio and transcribe if it's an MP4 file
    if file.filename.lower().endswith('.mp4'):
        audio_path = extract_audio(file_path)
        transcript = transcribe_audio(audio_path)
    else:
        transcript = None

    return jsonify({
        "message": "File uploaded successfully",
        "file_name": file.filename,
        "file_size": os.path.getsize(file_path),
        "file_type": file.content_type,
        "transcript": transcript
    }), 200

def extract_audio(video_path):
    video = mp.VideoFileClip(video_path)
    audio_path = video_path.rsplit('.', 1)[0] + ".wav"
    video.audio.write_audiofile(audio_path)
    return audio_path

def transcribe_audio(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return "Audio is not clear enough for transcription."
    except sr.RequestError as e:
        return f"Could not request results; {e}"

if __name__ == '__main__':
    app.run(debug=True, port=8000)