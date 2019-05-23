function createTable1(id, arr) {
    var table = $('#'+id);

    for (i in arr) {
        if (!arr[i].date) {arr[i].date = '(TBA)';}
        arr[i].name = arr[i].name ? arr[i].name.replace('v', '') : arr[i].packver;
        if (arr[i].pre) {mcver += ` (pre${arr[i].pre})`;}
        if (arr[i].snap) {mcver += ` (${arr[i].snap})`;}

        table.append(`<tr>
        <td style="min-width: 250px">Nixinova Mash-Up ${arr[i].mcver} ${arr[i].id}</td>
        <td>v${arr[i].name}</td>
        <td width="100px"><a href="https://mediafire.com?${arr[i].dl}" target="_blank">Download</a></td>
        <td><small>${arr[i].date}</small></td>
        </tr>`);
    }
}
function createTable(id, arr) {
    try {createTable1(id,arr)}
    catch(e) {alert(id + e.stack)}
    finally {createTable1(id,arr)}
}