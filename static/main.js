spinner = '<div class="mdl-spinner mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>';

function get_current_switch_state() {
    $.get("/get_info/switch", function (data) {
    })
        .done(function (data) {
            if (data !== '') {
                $('#switch_state').html(create_port_table(JSON.parse(data)));
            } else {
                $('#switch_state').html(spinner);
            }
        }).fail(function () {
            $('#switch_state').html(spinner);
            console.log("fail")
    });
}

setInterval(() => get_current_switch_state(), 5000);

function create_port_table(data) {
    rows = '';
    for (var port in data) {
        rows += `<tr>\n` +
            `      <th class='mdl-data-table__cell--non-numeric'>${port}</th>\n` +
            `      <th>${data[port]}</th>\n` +
            `    </tr>\n`;
    }
    table = `<table class='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>\n` +
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
    return table;
}
