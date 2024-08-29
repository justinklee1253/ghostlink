import os
import logging
from dotenv import load_dotenv
import assemblyai as aai

# load environment variables from .env file
load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

assemblyai_api_key = os.getenv("ASSEMBLYAI_API_KEY")

# Ensure the API keys are loaded
assert assemblyai_api_key, "ASSEMBLYAI_API_KEY is not set in the environment variables"

aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")

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