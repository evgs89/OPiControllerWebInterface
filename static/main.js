spinner = '<div class="mdl-spinner mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>';

function get_info(url, render_function, container_id) {
    let x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.onload = function () {
            if (x.responseText !== '') {
                let new_html = render_function(JSON.parse(x.responseText));
                if (document.getElementById(container_id).innerHTML !== new_html) {
                    document.getElementById(container_id).innerHTML = new_html;
                }
            } else {
                document.getElementById(container_id).innerHTML = spinner;
            }
        };
    x.onerror = function () {
            document.getElementById(container_id).innerHTML = spinner;
            console.log(`${url} fail`)
    };
    x.send(null);
}

function get_current_switch_state() {
    get_info("/get_info/switch", create_port_table, 'switch_state');
}

function get_current_online_devices() {
    get_info("/get_info/ping", create_online_list, 'online-devices');
}

function get_vpn_info () {
    get_info("/get_info/vpn", create_vpn_card, 'vpn');
}



function get_all_info() {
    let x = new XMLHttpRequest();
    x.open("GET", '/get_info/update', true);
    x.send(null);
    get_current_switch_state();
    get_current_online_devices();
    get_vpn_info();
}

get_all_info();
setInterval(() => get_all_info(), 5000);


function create_port_table(data) {
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
}

function create_online_list(data) {
    let rows = '';
    for (let i in data) {
        rows += `<li class="mdl-list__item"><span class="mdl-list__item-primary-content">${data[i]}</span></li>`
    }
    return `<ul class="demo-list-icon mdl-list">${rows}</ul>`
}

function create_vpn_card(data) {
    let state = data[0] ? 'success' : 'error';
    let server = data[1] ? data[1] : 'Not connected';
    return      `<span class="mdl-chip mdl-chip--contact">` +
                    `<img class="mdl-chip__contact" src="/static/${state}.png" alt="${state}" />` +
                    `<span class="mdl-chip__text">${server}</span>` +
                `</span>`;
}
