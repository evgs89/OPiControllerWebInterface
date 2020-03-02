const lastLogMessagesToShow = 8;

function init_logConnector() {
    get_last_log();
    setInterval(get_last_log, 5000);
}

function get_last_log() {
    let x = new XMLHttpRequest();
    x.open("GET", `http://${document.location.hostname}:48700/?num=${lastLogMessagesToShow}`, true);
    x.onload = function () {
        if (x.responseText !== '') {
            let data = JSON.parse(x.responseText);
            let rows = '';
            for (let i in data) {
                rows += `<li class="mdl-list__item mdl-list__item--two-line">`
                            +`<span class="mdl-list__item-primary-content">${data[i][2]}`
                                +`<span class="mdl-list__item-sub-title"><i>${data[i][0]}</i> ${data[i][1]}</span>`
                            +`</span>`
                        +`</li>`
            }
            document.getElementById('log').innerHTML = `<ul class="demo-list-icon mdl-list">${rows}</ul>`
        } else {
            document.getElementById('log').innerHTML = spinner;
        }
    };
    x.onerror = function () {
        document.getElementById('log').innerHTML = spinner;
        console.log(`fail`)
    };
    x.send(null);
}

function init_switchManagement() {
    let switchManagement = new RabbitElement(`/exchange/messages/devstate`,'switch');
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
    let Ping = new RabbitElement('/exchange/messages/ping', 'online-devices');
    Ping.render_function = function (data) {
        let rows = '';
        for (let i in data) {
            if (data[i][1]) {
                rows += `<li class="mdl-list__item"><span class="mdl-chip"><span class="mdl-chip__text">${data[i][0]}</span></span></li>`;
            }
        }
        return `<ul class="demo-list-icon mdl-list">${rows}</ul>`
    };
    Ping.connect();
}

function init_VPN () {
    let VPN = new RabbitElement('/exchange/messages/vpn', 'vpn');
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
