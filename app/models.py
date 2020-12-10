from . import db
from werkzeug.security import generate_password_hash,check_password_hash
from flask_login import UserMixin
from . import login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    fullname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique = True, index = True)
    pass_secure = db.Column(db.String(255))
    marks = db.Column(db.Integer, default = 0)

    def save_user(self):
        '''
        Function to save user object in the database
        '''
        db.session.add(self)
        db.session.commit()

    @property
    def password(self):
        raise AttributeError('You cannot read the password attribute')

    @password.setter
    def password(self, password):
        self.pass_secure = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.pass_secure, password)


    def __repr__(self):
        return f'User {self.username}'
class Question:    
    '''
    Country class to define country Objects
    '''

    def __init__(self,id,question,correct_answer,incorrect_answers,answers,all_answers):
        self.id=id
        self.question= question
        self.correct_answer = correct_answer
        self.incorrect_answers = incorrect_answers
        self.answers = answers
        self.all_answers = all_answers

