from flask import render_template, request, redirect, url_for, abort
from . import main
from flask_login import login_required, current_user
from .. import db
from ..requests import get_questions
from flask import request
from ..models import User,Leaderboard

@main.route('/')
def index():
    title="Quiz Game"
    return render_template('index.html')

@main.route("/category/<id>")
@login_required
def category(id):
    questions=get_questions(id)
    return render_template("category.html",id=id, questions=questions)

@main.route('/save',methods=['POST'])
def save_marks():
    data=request.json
    user=User.query.filter_by(id = data['id']).first()
    user.marks=data['marks']
    db.session.commit()
    print(user.marks)
    return ''
@main.route('/leaderboard')
def show_users():
    users1=User.query.order_by(User.marks.desc()).all()
    users=[]
    counter=1
    for user in users1:
        new_user = Leaderboard(id=counter,name=user.fullname,marks=user.marks)
        counter=counter+1
        users.append(new_user)
    return render_template("leaderboard.html", users=users)
