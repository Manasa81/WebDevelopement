from flask_sqlalchemy import SQLAlchemy
from datetime import datetime as dt

db = SQLAlchemy()

class user(db.Model):
    
    __tablename__ = "credentials"
    username = db.Column(db.String(80),index=False,unique=False,nullable=False)
    email = db.Column(db.String(120),primary_key=True,nullable=False)
    password = db.Column(db.String(80),index=False,unique=True,nullable=False)
    # gender = db.Column(db.String(15),index=False,unique=False,nullable=False)
    # created =db.Column(db.DateTime,index=False,unique=False,nullable=False)

    def __init__(self, username, email,password):
        self.username = username
        self.email = email
        self.password=password

    def __repr__(self):
        return self.password


class Book(db.Model):
    __tablename__ = "books"
    isbn = db.Column(db.String ,primary_key=True)
    title = db.Column(db.String,unique=True,nullable=False)
    author = db.Column(db.String,nullable=False)
    year = db.Column(db.Integer,nullable=False)

    def __init__(self, isbn, title,author,year):
        self.isbn = isbn
        self.title = title
        self.author=author
        self.year=year

