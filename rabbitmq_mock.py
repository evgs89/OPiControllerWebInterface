#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 11 11:43:28 2020

@author: ybsemeny
"""

import pika
from time import sleep
import random
import json
import datetime


conn = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = conn.channel()
args = {'x-message-ttl': 5000, 'x-max-length': 1}
channel.exchange_declare(exchange='messages', exchange_type='topic')
channel.queue_declare(queue='devstate', durable=False)
channel.queue_bind(queue='devstate', exchange='messages', routing_key='devstate')
channel.queue_declare(queue='ping', arguments=args, durable=False)
#channel.queue_bind(queue='ping', exchange='messages', routing_key='devstate')
channel.queue_declare(queue='vpn', arguments=args, durable=False)
#channel.queue_bind(queue='vpn', exchange='messages', routing_key='vpn')
channel.exchange_declare(exchange='log', exchange_type='topic')
channel.queue_declare('logs', durable=True)
channel.queue_bind(queue='logs', exchange='log', routing_key='logging')
log_sources = ['VPN', 'Ping', 'Switch', 'Log']
while True:
    if random.random() > 0.9:
        message = ''
    else:
        message = json.dumps({1: 1, 2: 2, 3: 2, 4: 2, 5: 1})
    channel.basic_publish(exchange='messages',
                          routing_key='devstate',
                          body=str(message))
    print("sent ", str(message))
    ping_state = {'192.168.250.1': [True, '2020-02-18 10:00:00'],
                  '192.168.250.10': [False, '2020-02-18 10:10:00'],
                  '192.168.250.15': [True, '2020-02-18 10:50:10'],
                  '192.168.250.129': [True, '2020-02-18 11:13:55']}
    ping_message = json.dumps(ping_state)
    channel.basic_publish(exchange='',
                          routing_key='ping',
                          body=ping_message)
    print("sent", ping_message)
    if random.random() > 0.1:
        vpn_message = json.dumps([True, '10.221.12.3'])
    else:
        vpn_message = json.dumps([False, None])
    channel.basic_publish(exchange='',
                          routing_key='vpn',
                          body=vpn_message)
    print("sent", vpn_message)
    log_source = random.choice(log_sources)
    log_message = str(random.random())
    logtime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    channel.basic_publish(exchange='log',
                          routing_key='logging',
                          body=f"{logtime}: {log_source}: {log_message}")
    print("sent ", str(log_message))
    sleep(30)



