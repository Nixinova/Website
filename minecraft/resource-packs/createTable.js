function create_table(ver, arr) {
    var id = ver.replace(/\./g, '_');
    var table = $('#'+id);
    for (i in arr) {
        if (!arr[i].date) {arr[i].date = '';}
        if (!attr[i].name) {arr[i].name = attr[i].packver;}
        if (!attr[i].mcver) {arr[i].mcver = ver}

        table.append(`<tr>
        <td style="min-width: 250px">Nixinova Mash-Up ${arr[i].mcver} ${arr[i].id}</td>
        <td>v${attr[i].name}</td>
        <td><a href="https://mediafire.com?${arr[i].dl}" target="_blank">Download</a></td>
        <td><small>${arr[i].date}</small></td>
        </tr>`);
    }
}

function createTable(ver, arr) {
    try {
        create_table(ver, arr);
    }
    catch(e) {
        alert(ver + e.stack )
    }
    finally {
        create_table(ver, arr);
    }
}