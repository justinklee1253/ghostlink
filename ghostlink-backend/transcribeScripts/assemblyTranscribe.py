import os
from dotenv import load_dotenv
import assemblyai as aai

# load environment variables from .env file
load_dotenv()

aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")

def processVideo(file_path):
    print(f"\n\nReceived audio file: {file_path} \n\n ********")

    video_file = file_path
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(video_file)

    if transcript.status == aai.TranscriptStatus.error:
        print('ERROR:',transcript.error)
    else:
        print(f"\n\n******** Transcription: {transcript.text} ********\n\n")

    return transcript.text