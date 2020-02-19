let spinner = '<div class="mdl-spinner mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>';
const lastLogLen = 8;

function getSessionId() {
    if (localStorage.getItem('rabbit_id') === null) {
        let rabbitID = Math.floor(Math.random() * 10000);
        localStorage.setItem('rabbit_id', rabbitID.toString());
    }
    return localStorage.getItem('rabbit_id');
}

class LimitedList {
    constructor(max_length) {
        this.max_length = max_length;
        this.data = [];
        this.messages = [];
    }

    add_data(data) {
        if ((this.data.length) > this.max_length) {
            this.data.shift();
            let delMsg = this.messages.shift();
            delMsg.ack();
        }
        this.data.push(data.body);
        this.messages.push(data)
    }
}

class RabbitElement {
    constructor (queue, element) {
        this.login = 'guest';
        this.password = 'guest';
        this.client = Stomp.over(new WebSocket(`ws://${document.location.hostname}:15674/ws`));
        this.queue = queue;
        this.container = element;
        this.connection_options = {
            persistent: true,
            id: getSessionId(),
            ack: 'auto',
            'x-max-length': '1',
            'x-message-ttl': '5000'
        };
    }

    _on_message(message) {
        if (message.body !== '') {
            let data = this.process_data(message);
            document.getElementById(this.container).innerHTML = this.render_function(data);
        } else {
            document.getElementById(this.container).innerHTML = spinner;
        }
    }

    process_data(data) {
        return JSON.parse(data.body);
    }

    render_function(data) { return data }

    _on_connect() {
        let message_callback = this._on_message.bind(this);
        this.client.subscribe(this.queue, message_callback, this.connection_options);
    }

    _on_error() {
    console.log('error');
    }

    connect() {
        let connect_callback = this._on_connect.bind(this);
        let error_callback = this._on_error.bind(this);
        this.client.connect(this.login, this.password, connect_callback, error_callback, '/');
    }
}
