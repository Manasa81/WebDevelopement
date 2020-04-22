import csv
import os
import datetime
from flask import Flask, session,request,render_template,flash,logging,redirect,url_for
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_sqlalchemy import SQLAlchemy
import csv
from  models import *
from create import app

app = Flask(__name__)
os.environ['DATABASE_URL'] =  'postgres://yezocqidotvbaj:63d37cde50bccb34c9b546fdb6d18342f78d71b9847a986fd3ba065b5e8ad59c@ec2-18-235-20-228.compute-1.amazonaws.com:5432/d2kgfpergha2b4'
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))
# Session = scoped_session(sessionmaker(bind=engine))


  # Same setup code as before.

def main():
    f = open("books.csv")
    reader = csv.reader(f)
    for isbn, title,author,year in reader:
        b = Book(isbn=isbn, title=title,author=author,year=year)
        db.add(b)
        # print(f"Added flight from {origin} to {destination} lasting {duration} minutes.")
        print(isbn)
    db.commit()
if __name__ == "__main__":
    main()