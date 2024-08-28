import logging
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import assemblyai as aai
from openai import OpenAI

def create_video_bp(openai_api_key, assemblyai_api_key):
    # Set API keys for AssemblyAI and OpenAI
    aai.settings.api_key = assemblyai_api_key
    client = OpenAI(api_key=openai_api_key)

    # Initialize logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    video_bp = Blueprint('video_bp', __name__)

    UPLOAD_FOLDER = 'uploads/'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    def process_video(file_path):
        """Process video using AssemblyAI and return transcription."""
        logger.info(f"Starting transcription for file: {file_path}")
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(file_path)

        if transcript.status == aai.TranscriptStatus.error:
            logger.error(f"Transcription Error: {transcript.error}")
            raise Exception(f"Transcription Error: {transcript.error}")

        logger.info(f"Transcription complete: {transcript.text}")
        return transcript.text

    def generate_linkedin_post(transcription_text):
        logger.info(f"Generating LinkedIn post for transcription: {transcription_text}")
        prompt = (
            f"""Given the following transcription from a video: '{transcription_text}', 
            You are an AI ghostwriter specializing in converting content from social media videos 
            into professional, engaging, and viral LinkedIn posts. Content creators will upload 
            their TikTok or Instagram Reels videos, and your task is to extract the core message 
            from the video’s text and reformat it into a compelling LinkedIn post. The post should 
            maintain a professional tone, highlight key takeaways, include a strong call-to-action, 
            and be optimized for LinkedIn’s audience, focusing on themes such as business insights, 
            personal branding, leadership, and industry trends. Instructions: 

            1. Extract Core Message: Identify the key message or theme of the video. What is the most important point or insight the creator is conveying?
            2. Reformat for LinkedIn: Reword the message to suit a LinkedIn audience. Ensure the tone is professional and aligns with the platform’s expectations.
            3. Highlight Takeaways: Clearly state any actionable insights or lessons that can be drawn from the video. Use bullet points or numbered lists if necessary to enhance clarity.
            4. Include Call-to-Action: Encourage engagement by asking the audience to share their thoughts, experiences, or advice related to the post. The CTA should be relevant to the content of the post.
            5. Optimize for Virality: Make the post relatable, concise, and impactful. Use powerful language, and ensure it resonates with LinkedIn users who are professionals looking for value-driven content. We want to drive as many likes, comments, shares, and impressions as possible.

            Example Input: A creator uploads a video discussing the importance of embracing failure as a stepping stone to success, showing various clips of their own journey through setbacks.

            Example Output: Failure is not the opposite of success; it’s a crucial part of the journey. In my early days, I faced numerous setbacks that made me question my path. But looking back, each failure was a lesson in disguise—a stepping stone that led to growth, resilience, and, ultimately, success.

            Key Takeaways:
            1. Embrace Failure: Every setback is an opportunity to learn and improve.
            2. Stay Resilient: The ability to bounce back from failure defines your long-term success.
            3. Celebrate Growth: Measure your progress by the lessons learned, not just by the wins.

            Let’s normalize discussing our failures just as much as our successes. After all, every great achievement has a story of struggle behind it.
            What’s a failure that shaped your career? Share your experience below and let’s inspire each other!
            
            Please limit your response to fit within the maximum allowed tokens."""
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an AI ghostwriter specializing in converting content from social media videos into LinkedIn posts."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )

        linkedin_post = response.choices[0].message.content.strip()
        logger.info(f"LinkedIn post generated: {linkedin_post}")
        return linkedin_post

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

            # Generate LinkedIn post
            linkedin_post = generate_linkedin_post(transcription_text)

            return jsonify({
                "transcription_text": transcription_text,
                "linkedin_post": linkedin_post
            }), 200

        except Exception as e:
            logger.error(f"An error occurred during processing: {e}")
            return jsonify({"error": "An error occurred during processing"}), 500

        finally:
            # Clean up the local file after processing
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Deleted file: {file_path}")

    return video_bp
