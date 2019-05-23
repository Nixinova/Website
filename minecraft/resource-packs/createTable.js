function createTable(id, arr) {
    var table = $('#'+id);

    for (i in arr) {
        if (!arr[i].date) {arr[i].date = '(TBA)';}
        if (!arr[i].name) {arr[i].name = arr[i].packver;}
        if (arr[i].snap) {arr[i].mcver == `${arr[i].mcver} (${arr[i].snap})`;}

        table.append(`<tr>
        <td style="min-width: 250px">Nixinova Mash-Up ${arr[i].mcver} ${arr[i].id}</td>
        <td>${arr[i].name}</td>
        <td width="100px"></td>
        <td width="100px"><a href="https://mediafire.com?${arr[i].dl}" target="_blank">Download</a></td>
        <td><samp><time datetime="${arr[i].date.replace(/-/g,'')}+12:00">${arr[i].date}</time></samp></td>
        </tr>`);
    }
}