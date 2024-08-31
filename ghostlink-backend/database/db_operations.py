from sqlalchemy.exc import IntegrityError
from .models import db, User, Waitlist

def upsert_user_waitlist(full_name, email):
    """
    Upserts a user and waitlist entry.
    
    :param full_name: Full name of the user.
    :param email: Email address of the user.
    :return: Dictionary with status and message.
    """
    try:
        # Check if the user exists
        user = User.query.filter_by(email=email).first()

        if user and user.is_waitlisted:
            return {"status": "success", "message": "User is already waitlisted."}
        elif user:
            # Update the existing user
            user.name = full_name
            user.is_waitlisted = True
        else:
            # Create a new user
            user = User(name=full_name, email=email, is_waitlisted=True)
            db.session.add(user)
            db.session.flush()  # Flush to get the user.id

        # Check if the waitlist entry exists for the user
        waitlist_entry = Waitlist.query.filter_by(user_id=user.id).first()

        if not waitlist_entry:
            # Create a new waitlist entry
            waitlist_entry = Waitlist(user_id=user.id, is_waitlisted=True)
            db.session.add(waitlist_entry)

        # Commit the session to the database
        db.session.commit()

        return {"status": "success", "message": "User and waitlist entry updated/added successfully."}
    except IntegrityError as e:
        db.session.rollback()
        return {"status": "error", "message": str(e)}
    except Exception as e:
        db.session.rollback()
        return {"status": "error", "message": f"An error occurred: {e}"}
