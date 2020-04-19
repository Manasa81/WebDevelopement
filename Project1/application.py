import os

from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask.templating import render_template
from flask import request

app = Flask(__name__)
os.environ['DATABASE_URL'] =  'postgres://yezocqidotvbaj:63d37cde50bccb34c9b546fdb6d18342f78d71b9847a986fd3ba065b5e8ad59c@ec2-18-235-20-228.compute-1.amazonaws.com:5432/d2kgfpergha2b4'

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register" , methods=["GET","post"])
def register():
    if request.method == "GET":
        return "PLEASE SUBMIT THE FORM"
    else:
        name = request.form.get("name")
        return render_template("register.html", name=name)
@app.route("/login",methods=["GET","POST"])
def login():
    if request.method == "GET":
        return "Please enter credentials in home page"
    else:
        return render_template("login.html")