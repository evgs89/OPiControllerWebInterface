from flask import Blueprint, render_template

log_page = Blueprint('log_page', __name__, template_folder='templates')


@log_page.route('/')
def show_log_page():
    return render_template('log.html')
