from flask import Flask, render_template
import json
import pika


class LimitedList:
    def __init__(self, length):
        self._data = []
        self._len = length

    def add(self, data):
        if len(self._data) > self._len:
            self._data.pop[0]
        self._data.append(data)

    def get_all(self):
        return self._data


class LastData:
    switch_state = ''
    online_list = ''
    vpn_state_ = '[false, null]'


app = Flask(__name__)


def _start_rabbit():
    conn = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = conn.channel()
    args = {'x-message-ttl': 5000}
    channel.queue_declare(queue='devstate', arguments=args)
    channel.queue_declare(queue='ping', arguments=args)
    return channel


rabbit_channel = _start_rabbit()


@app.route('/')
def start_page():
    return render_template('main.html')


@app.route('/get_info/update')
def update_data():
    LastData.switch_state = rabbit_channel.basic_get(queue="devstate", auto_ack=True)[2] or ''
    LastData.online_list = rabbit_channel.basic_get(queue="ping", auto_ack=True)[2] or ''
    LastData.vpn_state_ = json.dumps((True, '10.23.41.231'))
    return ''


@app.route('/get_info/switch')
def switch_state():
    return LastData.switch_state

@app.route('/get_info/ping')
def ping_state():
    return LastData.online_list

@app.route('/get_info/vpn')
def vpn_state():
    return LastData.vpn_state_


if __name__ == '__main__':
    app.run()
