import sys
import os
import uuid

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import create_app
from database.models import db, User, Post  # Change to absolute import
from sqlalchemy.exc import IntegrityError

def upsert_user_with_post(user_id, name, email, post_text):
    """Upserts a user and creates a post for them."""
    app = create_app()
    
    with app.app_context():
        try:
            # Check if user already exists
            user = User.query.filter_by(id=user_id).first()
            
            if user:
                # Update user details if already exists
                user.name = name
                user.email = email
                print(f"User {name} already exists, updating details.")
            else:
                # Insert a new user if doesn't exist
                user = User(id=user_id, name=name, email=email)
                db.session.add(user)
                print(f"Adding new user: {name}.")

            # Create a post for the user with a generated UUID for the id
            post = Post(id=str(uuid.uuid4()), user_id=user_id, generated_text=post_text)
            db.session.add(post)
            print(f"Adding post for user {name}.")

            # Commit the changes to the database
            db.session.commit()
            print(f"User and post successfully upserted into the database.")

        except IntegrityError:
            db.session.rollback()
            print("There was an error upserting the user. Rolling back changes.")
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Test data
    dummy_user_id = "12345"  # Example user ID (use a real UUID in production)
    dummy_name = "John Doe"
    dummy_email = "johndoe@example.com"
    dummy_post_text = "This is a generated LinkedIn post for John Doe."

    upsert_user_with_post(dummy_user_id, dummy_name, dummy_email, dummy_post_text)