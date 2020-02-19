from flask import Blueprint, render_template

switch_page = Blueprint('switch_page', __name__, template_folder='templates', static_folder='static')


@switch_page.route('/')
def show_switch_page():
    return render_template('switch.html')
