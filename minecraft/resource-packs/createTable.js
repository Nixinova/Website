function createTable(mcver, arr) {
    var table = $('#v'+mcver);
    for (i in arr) {
        table.append(`<tr>
        <td>Nixinova Mash-Up ${mcver}-${arr.id}</td>
        <td><a href="https://mediafire.com?${arr.dl}" target="_blank">Download</a></td>
        <td><small>${arr.date}</small></td>
        </tr>`)
    }
}