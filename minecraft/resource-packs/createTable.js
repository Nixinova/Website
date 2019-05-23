function createTable1(id, arr) {
    var table = $('#'+id);

    for (i in arr) {
        if (!arr[i].date) {arr[i].date = '(TBA)';}
        if (!arr[i].name) {arr[i].name = arr[i].packver;}
        if (arr[i].pre) {arr[i].mcver == `${arr[i].mcver} (pre${arr[i].pre})`;}
        if (arr[i].snap) {arr[i].mcver == `${arr[i].mcver} (${arr[i].snap})`;}

        table.append(`<tr>
        <td style="min-width: 250px">Nixinova Mash-Up ${arr[i].mcver} ${arr[i].id}</td>
        <td>${arr[i].name}</td>
        <td width="100px"><a href="https://mediafire.com?${arr[i].dl}" target="_blank">Download</a></td>
        <td><samp>${arr[i].date}</samp></td>
        </tr>`);
    }
}
function createTable(id, arr) {
    try {createTable1(id,arr)}
    catch(e) {alert(id + e.stack)}
    finally {createTable1(id,arr)}
}