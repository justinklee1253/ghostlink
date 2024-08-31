import os
from flask import Flask
from flask_cors import CORS
from routes.videoProcessing import video_bp
from routes.handleWaitlist import waitlist_bp
from database import create_app

app = create_app()
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register the video processing blueprint
app.register_blueprint(video_bp, url_prefix='/api')
app.register_blueprint(waitlist_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=4000)
