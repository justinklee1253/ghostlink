from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google.cloud import storage, videointelligence_v1 as videointelligence
import logging 

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

bucket_name = 'ghostlink_bucket_test'
storage_client = storage.Client(project='ghostlink')

def upload_to_gcs(file_path, bucket_name):
    """Uploads a file to the bucket."""
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(os.path.basename(file_path))
    blob.upload_from_filename(file_path)
    return f'gs://{bucket_name}/{blob.name}'

def analyze_video(gcs_uri):
    client = videointelligence.VideoIntelligenceServiceClient()
    features = [
        videointelligence.Feature.LABEL_DETECTION,
        videointelligence.Feature.SPEECH_TRANSCRIPTION
    ]

    try: 
        logging.info(f"Starting video analysis for: {gcs_uri}")
        operation = client.annotate_video(
            request={
                "features": features,
                "input_uri": gcs_uri,
                "video_context": {
                    "speech_transcription_config": {
                        "enable_speaker_diarization": True,
                        "diarization_speaker_count": 0,  # Allows API to decide the number of speakers
                        "language_code": "en-US"
                    }
                }
            }
        )
        logging.info("Processing video for analysis...")
        result = operation.result(timeout=600)

        # Extract relevant information from the response
        annotations = []
        for annotation in result.annotation_results:
            labels = annotation.segment_label_annotations
            transcriptions = annotation.speech_transcriptions

            # Filter labels and transcriptions
            for label in labels:
                annotations.append({
                    "label": label.entity.description,
                    "confidence": label.segments[0].confidence
                })

            for transcription in transcriptions:
                for alternative in transcription.alternatives:
                    annotations.append({
                        "transcript": alternative.transcript,
                        "confidence": alternative.confidence,
                        "speakers": [{
                            "speaker_tag": word_info.speaker_tag,
                            "word": word_info.word
                        } for word_info in alternative.words]
                    })

        logging.info(f"Video analysis completed with annotations: {annotations}")
        return annotations

    except Exception as e:
        logging.error(f"Error during video processing: {e}")
        if hasattr(e, 'response'):
            logging.error(f"Error response: {e.response.content}")
        raise


def format_linkedin_post(annotations):
    """Formats the extracted text into a viral LinkedIn post."""
    transcript = ' '.join([ann['transcript'] for ann in annotations if 'transcript' in ann])
    post = f"🎥 Just analyzed a video and here’s what I learned: \n\n{transcript[:280]}...\n\n#VideoAnalysis #AI #LinkedIn"
    return post

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Upload the file to Google Cloud Storage
    gcs_uri = upload_to_gcs(file_path, bucket_name)
    
    # Analyze the video using Google Cloud Video Intelligence API
    annotations = analyze_video(gcs_uri)
    
    # Format the annotations into a LinkedIn post
    linkedin_post = format_linkedin_post(annotations)

    return jsonify({
        "message": "File uploaded and analyzed successfully",
        "file_name": file.filename,
        "file_size": os.path.getsize(file_path),
        "file_type": file.content_type,
        "linkedin_post": linkedin_post
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)


# def extract_audio(video_path):
#     video = mp.VideoFileClip(video_path)
#     audio_path = video_path.rsplit('.', 1)[0] + ".wav"
#     video.audio.write_audiofile(audio_path)
#     return audio_path

# def transcribe_audio(audio_path):
#     recognizer = sr.Recognizer()
#     with sr.AudioFile(audio_path) as source:
#         audio = recognizer.record(source)
#     try:
#         return recognizer.recognize_google(audio)
#     except sr.UnknownValueError:
#         return "Audio is not clear enough for transcription."
#     except sr.RequestError as e:
#         return f"Could not request results; {e}"

if __name__ == '__main__':
    app.run(debug=True, port=8000)