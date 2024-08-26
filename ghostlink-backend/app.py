import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from google.cloud import storage, videointelligence_v1 as videointelligence
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
from werkzeug.utils import secure_filename
from flask_cors import CORS


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}) 
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Retrieve API keys from environment variables
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

bucket_name = 'ghostlink_bucket'
storage_client = storage.Client(project='ghostlink')

def upload_to_gcs(file_path, bucket_name):
    """Uploads a file to the bucket."""
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(os.path.basename(file_path))
    blob.upload_from_filename(file_path)
    return f'gs://{bucket_name}/{blob.name}'

def transcribe_video(video_uri):
    """Transcribes video content using Google Cloud Video Intelligence."""
    client = videointelligence.VideoIntelligenceServiceClient()

    features = [videointelligence.Feature.SPEECH_TRANSCRIPTION]

    operation = client.annotate_video(
        request={
            "features": features,
            "input_uri": video_uri,
            "video_context": {
                "speech_transcription_config": {
                    "language_code": "en-US",
                    "enable_automatic_punctuation": True
                }
            },
        }
    )

    print("Processing video...")
    result = operation.result(timeout=600)

    transcription = ""

    for annotation_result in result.annotation_results:
        for speech_transcription in annotation_result.speech_transcriptions:
            for alternative in speech_transcription.alternatives:
                transcription += alternative.transcript + " "

    return transcription.strip()

def generate_linkedin_post(transcription_text):
    """Generates a LinkedIn post using the latest OpenAI API."""
    prompt = (
        f"Given the following transcription from a video: '{transcription_text}', "
        "You are an AI ghostwriter specializing in converting content from social media videos "
        "into professional, engaging, and viral LinkedIn posts. Content creators will upload "
        "their TikTok or Instagram Reels videos, and your task is to extract the core message "
        "from the video’s text and reformat it into a compelling LinkedIn post. The post should "
        "maintain a professional tone, highlight key takeaways, include a strong call-to-action, "
        "and be optimized for LinkedIn’s audience, focusing on themes such as business insights, "
        "personal branding, leadership, and industry trends. Instructions: \n\n"

        "1. Extract Core Message: Identify the key message or theme of the video. What is the most important point or insight the creator is conveying?\n"
        "2. Reformat for LinkedIn: Reword the message to suit a LinkedIn audience. Ensure the tone is professional and aligns with the platform’s expectations.\n"
        "3. Highlight Takeaways: Clearly state any actionable insights or lessons that can be drawn from the video. Use bullet points or numbered lists if necessary to enhance clarity.\n"
        "4. Include Call-to-Action: Encourage engagement by asking the audience to share their thoughts, experiences, or advice related to the post. The CTA should be relevant to the content of the post.\n"
        "5. Optimize for Virality: Make the post relatable, concise, and impactful. Use powerful language, and ensure it resonates with LinkedIn users who are professionals looking for value-driven content. We want to drive as many likes, comments, shares, and impressions as possible.\n\n"

        "Example Input: A creator uploads a video discussing the importance of embracing failure as a stepping stone to success, showing various clips of their own journey through setbacks.\n\n"

        "Example Output: Failure is not the opposite of success; it’s a crucial part of the journey. In my early days, I faced numerous setbacks that made me question my path. But looking back, each failure was a lesson in disguise—a stepping stone that led to growth, resilience, and, ultimately, success.\n\n"

        "Key Takeaways:\n"
        "1. Embrace Failure: Every setback is an opportunity to learn and improve.\n"
        "2. Stay Resilient: The ability to bounce back from failure defines your long-term success.\n"
        "3. Celebrate Growth: Measure your progress by the lessons learned, not just by the wins.\n\n"

        "Let’s normalize discussing our failures just as much as our successes. After all, every great achievement has a story of struggle behind it.\n"
        "What’s a failure that shaped your career? Share your experience below and let’s inspire each other!"
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
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # Save the file locally
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(file_path)

        # Upload the file to Google Cloud Storage
        video_uri = upload_to_gcs(file_path, bucket_name)
        print(f"Uploaded to GCS: {video_uri}")  # Debugging

        # Transcribe video
        transcription_text = transcribe_video(video_uri)

        # Generate LinkedIn post
        linkedin_post = generate_linkedin_post(transcription_text)

        return jsonify({
            "file_name": file.filename,
            "file_size": os.path.getsize(file_path),
            "file_type": file.content_type,
            "linkedin_post": linkedin_post
        }), 200

    except Exception as e:
        print(f"An error occurred: {e}")  # Debugging
        return jsonify({"error": "An error occurred during processing"}), 500

    finally:
        # Clean up the local file after processing
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True, port=8000)