function init_Ping () {
    let Ping = new RabbitElement('/exchange/messages/ping', 'ping_table');
    Ping.render_function = function (data) {
        let rows = '';
        for (let i in data) {
            let state = data[i][1] ? 'success' : 'error';
            let icon = `<div class="section__circle-container mdl-cell mdl-cell--1-col">` +
                            `<div class="section__circle-container__circle">` +
                                `<img src="/static/${state}.png" style="height: 48px; width: 48px" />` +
                            `</div>` +
                        `</div>`;
            let message = data[i][1] ? 'Доступен' : 'Недоступен';
            rows += `<tr><td>${icon}</td><td>${data[i][0]}</td><td>${message}</td><td>${data[i][2]}</td></tr>`;
        }
        return `<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">` +
                    `<thead><tr>` +
                        `<th class="mdl-data-table__cell--non-numeric"></th>` +
                          `<th>IP</th><th>Состояние</th><th>Последнее изменение</th>` +
                            `</tr></thead>` +
                            `<tbody>${rows}</tbody>` +
               `</table>`;
    };
    Ping.connect();
}

window.onload = init_Ping;