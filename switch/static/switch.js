function init_Switch () {
    let Switch = new RabbitElement('/exchange/messages/devstate', 'switch');
    Switch.render_function = function (data) {
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
    Switch.connect();
}

window.onload = init_Switch;