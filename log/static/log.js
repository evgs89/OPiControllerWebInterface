const logPageSize = 10;

function init_Log() {
    get_last_log();
}

function add_rows_to_table(data) {
    let table = document.getElementById("log_table");
    for (let msg in data) {
        let tr = document.createElement('tr');
        for (let i in data[msg]) {
            let text = data[msg][i];
            if (i == 0) {
                console.log(text);
                let date = new Date(text * 1000);
                text = date;
            }
            let td = document.createElement('td');
            td.setAttribute("class", "mdl-data-table__cell--non-numeric");
            td.innerHTML = text;
            tr.appendChild(td);
        }
        table.tBodies[0].appendChild(tr);
    }
}

function get_last_log(page=0) {
    let x = new XMLHttpRequest();
    x.open("GET", `http://${document.location.hostname}:48700/?num=${logPageSize}&page=${page}`, true);
    x.onload = function () {
        if (x.responseText !== '') {
            let data = JSON.parse(x.responseText);
            add_rows_to_table(data)
        } else {
            console.log("isEmpty")
        }
    };
    x.onerror = function () {
        console.log(`Fail`);
    };
    x.send(null);
}

window.onload = init_Log();