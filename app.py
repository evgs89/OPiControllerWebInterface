from flask import Flask, render_template
from log import log_page


app = Flask(__name__)
app.register_blueprint(log_page, url_prefix="/log")


@app.route('/')
def start_page():
    return render_template('main.html')


if __name__ == '__main__':
    app.run()
