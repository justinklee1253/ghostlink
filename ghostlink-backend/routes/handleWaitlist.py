from flask import Blueprint, request, jsonify
from database.db_operations import upsert_user_waitlist
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

waitlist_bp = Blueprint('waitlist_bp', __name__)

@waitlist_bp.route('/waitlist', methods=['POST'])
def add_to_waitlist():
    full_name = request.form.get('fullName')
    email = request.form.get('email')

    if not full_name or not email:
        return jsonify({"status": "error", "message": "Name and email are required."}), 400

    logger.info(f"Adding to waitlist: {full_name} ({email})")
    
    # Use the upsert function
    result = upsert_user_waitlist(full_name, email)

    if result['status'] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
