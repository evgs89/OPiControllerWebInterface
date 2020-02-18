from flask import Blueprint, render_template

ping_page = Blueprint('ping_page', __name__, template_folder='templates', static_folder='static')


@ping_page.route('/')
def show_ping_page():
    return render_template('ping.html')
