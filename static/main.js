var current_switch_state = {};

function get_current_switch_state() {
    $.get("/get_info/switch", function (data) {
    })
        .done(function (data) {
            current_switch_state = data;
            alert(data);
        }).fail(function () {
        current_switch_state = {};
        alert("fail")
    });
}

setInterval(() => get_current_switch_state(), 5000);


//<div class="mdl-spinner mdl-js-spinner is-active"></div>