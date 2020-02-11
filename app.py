from flask import Flask, render_template
import json
import pika

app = Flask(__name__)

def _start_rabbit():
    conn = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = conn.channel()
    args = {'x-message-ttl': 5000}
    channel.queue_declare(queue='devstate', arguments=args)
    return channel

rabbit_channel = _start_rabbit()


@app.route('/')
def hello_world():
    return render_template('main.html')


@app.route('/get_info/switch')
def switch_state():
    result = rabbit_channel.basic_get(queue="devstate", auto_ack=True)[2] or ''
    return result



if __name__ == '__main__':
    app.run()
