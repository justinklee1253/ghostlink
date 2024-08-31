import uuid
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

# initialize SQLAlchemy (will be bound to our Flask app)
db = SQLAlchemy()

class User(db.Model):
    """User model. Represents a user in the system."""
    __tablename__ = 'users'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    is_waitlisted = db.Column(db.Boolean, default=False, nullable=False)

    # its relationship to posts model
    posts = db.relationship('Post', backref='user', lazy=True)
    # relationship to waitlist model
    waitlist_entry = db.relationship('Waitlist', backref='user', uselist=False)

    def __repr__(self):
        return f'<User {self.name}>'
    

class Post(db.Model):
    """Post model. Represents a linkedIn post generated from content."""
    __tablename__ = 'posts'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    generated_text = db.Column(db.Text, nullable=False)
    date_linkedPost_created = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'

class Waitlist(db.Model):
    """Waitlist model. Represents users who have signed up for the waitlist."""
    __tablename__ = 'waitlist'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    is_waitlisted = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f'<Waitlist {self.id}>'