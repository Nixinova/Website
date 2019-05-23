function createTable(mcver, arr) {
    var id = mcver.replace(/\./g, '_');
    var table = $('#'+id);
    for (i in arr) {
        if (arr[i].date === undefined) {arr.date = '';}
        table.append(`<tr>
        <td>Nixinova Mash-Up ${mcver}-${arr[i].id}</td>
        <td><a href="https://mediafire.com?${arr[i].dl}" target="_blank">Download</a></td>
        <td><small>${arr[i].date}</small></td>
        </tr>`);
    }
}