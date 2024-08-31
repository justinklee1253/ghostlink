import logging
from flask import Blueprint, request, jsonify
import os

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

waitlist_bp = Blueprint('waitlist_bp', __name__)

@waitlist_bp.route('/waitlist', methods=['POST'])
def add_to_waitlist():

    logger.info("beginning to add user to our waitlist")