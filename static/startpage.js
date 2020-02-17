class LimitedList {
    constructor(max_length) {
        this.max_length = max_length;
        this.data = [];
    }

    add_data(data) {
        if ((this.data.length) > this.max_length) {
            this.data.shift();
        }
        this.data.push(data);
    }
}

function init_logConnector() {
    let logConnector = new RabbitElement('logs', 'log');
    logConnector.connection_options = {durable: true};
    logConnector['log_messages'] = new LimitedList(8);
    logConnector.process_data = function (data) {
        this.log_messages.add_data(data);
        return this.log_messages.data;
    };
    logConnector.render_function = function (data) {
        let rows = '';
        for (let i in data) {
            rows += `<li class="mdl-list__item"><span class="mdl-list__item-primary-content">${data[i]}</span></li>`
        }
        return `<ul class="demo-list-icon mdl-list">${rows}</ul>`
    };
    logConnector.connect();
}

function init_switchManagement() {
    let switchManagement = new RabbitElement('devstate','switch');
    switchManagement.connection_options["x-message-ttl"] = 5000;
    switchManagement.process_data = function (data) {
        return JSON.parse(data);
    };
    switchManagement.render_function = function (data) {
        let rows = '';
        for (let port in data) {
            rows += `<tr>\n` +
                `      <th class='mdl-data-table__cell--non-numeric'>${port}</th>\n` +
                `      <th>${data[port]}</th>\n` +
                `    </tr>\n`;
        }
        return `<table class='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>\n` +
            `  <thead>\n` +
            `    <tr>\n` +
            `      <th class='mdl-data-table__cell--non-numeric'>Port</th>\n` +
            `      <th>VLAN</th>\n` +
            `    </tr>\n` +
            `  </thead>\n` +
            `  <tbody>\n` +
            `${rows}` +
            `  </tbody>\n` +
            `</table>`;
    };
    switchManagement.connect();
}

function init_Ping () {
    let Ping = new RabbitElement('ping', 'online-devices');
    Ping.connection_options["x-message-ttl"] = 5000;
    Ping.process_data = function (data) {
        return JSON.parse(data);
    };
    Ping.render_function = function (data) {
        let rows = '';
        for (let i in data) {
            rows += `<li class="mdl-list__item"><span class="mdl-chip"><span class="mdl-chip__text">${data[i]}</span></span></li>`
        }
        return `<ul class="demo-list-icon mdl-list">${rows}</ul>`
    };
    Ping.connect();
}

//<span class="mdl-list__item-primary-content">${data[i]}</span>

function init_VPN () {
    let VPN = new RabbitElement('vpn', 'vpn');
    VPN.connection_options["x-message-ttl"] = 5000;
    VPN.process_data = function (data) {
        return JSON.parse(data);
    };
    VPN.render_function = function (data) {
        let state = data[0] ? 'success' : 'error';
        let server = data[1] ? data[1] : 'Not connected';
        return      `<span class="mdl-chip mdl-chip--contact">` +
                        `<img class="mdl-chip__contact" src="/static/${state}.png" alt="${state}" />` +
                        `<span class="mdl-chip__text">${server}</span>` +
                    `</span>`;
    };
    VPN.connect();
}

window.onload = () => {
    init_logConnector();
    init_switchManagement();
    init_Ping();
    init_VPN();
};
