import urllib.request,json
from .models import Question
import random
base_url=None

def configure_request(app):
    global base_url
    base_url = app.config['QUIZ_BASE_URL']

def get_questions(category):
    '''
    Function that gets the json response to our url request
    '''
    get_questions_url = base_url.format(category)

    with urllib.request.urlopen(get_questions_url) as url:
        get_questions_data = url.read()
        get_questions_response = json.loads(get_questions_data)
        question_results = None

        if get_questions_response['results']:
            question_results_list = get_questions_response['results']
            question_results = process_results(question_results_list)


    return question_results

def process_results(question_list):
    '''
    Function  that processes the question result and transform them to a list of Objects

    Args:
        question_list: A list of dictionaries that contain question details

    Returns :
        question_results: A list of question objects
    '''
    question_results = []
    counter=1
    for question_item in question_list:
        id=counter
        question = question_item.get('question')
        correct_answer = question_item.get('correct_answer')
        incorrect_answers = question_item.get('incorrect_answers')
        answers = []
        answers.append(correct_answer)
        all_answers=[]
        for ans in incorrect_answers:
            answers.append(ans)
        while(len(answers)>0):
            x=random.choice(answers)
            all_answers.append(x)
            answers.remove(x)
        if correct_answer:
            question_object = Question(id,question,correct_answer,incorrect_answers,answers,all_answers)
            question_results.append(question_object)
        counter=counter+1
    return question_results