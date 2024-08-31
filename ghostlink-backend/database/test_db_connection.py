import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import create_app
from database.models import db, User, Post, Waitlist
from sqlalchemy.exc import IntegrityError

def upsert_user_with_post(name, email, post_text):
    """Upserts a user and creates a post for them."""
    app = create_app()
    
    with app.app_context():
        try:
            # Check if user already exists
            user = User.query.filter_by(email=email).first()
            
            if user:
                # Update user details if already exists
                user.name = name
                print(f"User {name} already exists, updating details.")
            else:
                # Insert a new user if doesn't exist
                user = User(name=name, email=email)
                db.session.add(user)
                db.session.commit()  # Commit the user to get the user.id
                print(f"Adding new user: {name}.")

            # Create a post for the user
            post = Post(user_id=user.id, generated_text=post_text)
            db.session.add(post)
            db.session.commit()  # Commit the post
            print(f"Adding post for user {name}.")

            print(f"User and post successfully upserted into the database.")

        except IntegrityError:
            db.session.rollback()
            print("There was an error upserting the user. Rolling back changes.")
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {e}")

def add_user_to_waitlist(email):
    """Adds a user to the waitlist."""
    app = create_app()
    
    with app.app_context():
        try:
            # Check if user already exists
            user = User.query.filter_by(email=email).first()
            
            if not user:
                print(f"User with email {email} does not exist.")
                return

            # Check if user is already waitlisted
            waitlist_entry = Waitlist.query.filter_by(user_id=user.id).first()
            if waitlist_entry:
                print(f"User {user.name} is already on the waitlist.")
            else:
                # Add user to waitlist
                waitlist_entry = Waitlist(user_id=user.id)
                db.session.add(waitlist_entry)
                user.is_waitlisted = True
                db.session.commit()
                print(f"User {user.name} added to the waitlist.")

        except IntegrityError:
            db.session.rollback()
            print("There was an error adding the user to the waitlist. Rolling back changes.")
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Test data
    dummy_name = "John Doe the 3rd"
    dummy_email = "johndoe3@example.com"
    dummy_post_text = "This is a generated LinkedIn post for John Doe the 3rd."

    # Upsert user and create post
    upsert_user_with_post(dummy_name, dummy_email, dummy_post_text)

    # Add user to waitlist
    add_user_to_waitlist(dummy_email)