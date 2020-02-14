from flask import Flask, render_template
import json
import pika


app = Flask(__name__)


@app.route('/')
def start_page():
    return render_template('main.html')


if __name__ == '__main__':
    app.run()
