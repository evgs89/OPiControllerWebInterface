from flask import Flask, render_template
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('main.html')


@app.route('/get_info/switch')
def switch_state():
    state = {0: 1, 1: 1, 2: 2, 3: 2, 4: 2, 5: 1}
    return json.dumps(state)


if __name__ == '__main__':
    app.run()
