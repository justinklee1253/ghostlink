import os
from flask import Flask
from flask_cors import CORS
from routes.videoProcessing import video_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register the video processing blueprint
app.register_blueprint(video_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=4000)
