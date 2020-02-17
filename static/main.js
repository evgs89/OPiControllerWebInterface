let spinner = '<div class="mdl-spinner mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>';


class RabbitElement {
    constructor (queue, element) {
        this.login = 'guest';
        this.password = 'guest';
        this.client = Stomp.over(new WebSocket(`ws://${document.location.hostname}:15674/ws`));
        this.queue = `/queue/${queue}`;
        this.container = element;
        this.connection_options = {
            durable: false,
            'auto-delete': false,
            exclusive: false,
            'x-message-ttl': null
        };
    }

    _on_message(message) {
        if (message.body !== '') {
            let data = this.process_data(message.body);
            document.getElementById(this.container).innerHTML = this.render_function(data);
        } else {
            document.getElementById(this.container).innerHTML = spinner;
        }
    }

    process_data(data) { return data }

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
