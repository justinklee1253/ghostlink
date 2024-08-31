import logging
from flask import Blueprint, request, jsonify
import os

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

waitlist_bp = Blueprint('waitlist_bp', __name__)