from flask import Flask
from .config import Config
from .models import db

def create_app():
    """create and configure the Flask app."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # initialize the database with the Flask app
    db.init_app(app)

    with app.app_context():

        # ceate database tables if they do not exist
        db.create_all()
    
    return app