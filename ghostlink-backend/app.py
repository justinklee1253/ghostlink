import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.videoProcessing import create_video_bp

# Load environment variables
load_dotenv()

# Retrieve API keys from environment variables
openai_api_key = os.getenv('OPENAI_API_KEY')
assemblyai_api_key = os.getenv('ASSEMBLYAI_API_KEY')

# Ensure the API keys are loaded
assert openai_api_key, "OPENAI_API_KEY is not set in the environment variables"
assert assemblyai_api_key, "ASSEMBLYAI_API_KEY is not set in the environment variables"

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register the video processing blueprint with the API keys
app.register_blueprint(create_video_bp(openai_api_key, assemblyai_api_key), url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=4000)
