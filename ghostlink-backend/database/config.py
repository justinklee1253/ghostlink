# this file is responsible for the database configuration settings and the database connection

import os
from dotenv import load_dotenv

# load the environment variables from the .env file
load_dotenv()

class Config:
    """Base configuaration class. Contains defualt configuration settings"""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Turn off update tracking for performance