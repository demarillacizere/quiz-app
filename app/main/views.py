from flask import render_template, request, redirect, url_for, abort
from . import main
from flask_login import login_required, current_user
from .. import db
from ..requests import get_questions

@main.route('/')
def index():
    title="Quiz Game"
    return render_template('index.html')

@main.route("/category/<id>")
@login_required
def category(id):
    questions=get_questions(id)
    return render_template("category.html",id=id, questions=questions)
