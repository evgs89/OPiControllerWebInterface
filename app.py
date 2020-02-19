from flask import Flask, render_template

from log import log_page
from ping import ping_page
from switch import switch_page


app = Flask(__name__)
app.register_blueprint(log_page, url_prefix="/log")
app.register_blueprint(ping_page, url_prefix="/ping")
app.register_blueprint(switch_page, url_prefix="/switch_management")


@app.route('/')
def start_page():
    return render_template('main.html')


if __name__ == '__main__':
    app.run()
