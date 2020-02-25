function error(err) {
}

function progress(val) {
    $('progress').attr('value',val);
}

function complete() {
    progress(1);
    setTimeout(function() {
        $('#loading').addClass('hide');
        $('#output').removeClass('hide');
    }, 250);
}

function initial() {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://launchermeta.mojang.com/mc/game/version_manifest.json'
    }).done(function(data) {
        let versions = data.versions;
        for (let version of versions) {
            $('#input-version').append(`<option>${version.id}</option>`);
        }
    });
};

function getInfo(id) {
    $('#loading').removeClass('hide');
    $('#output').addClass('hide');
    progress(0);
    //for (let id of sections) {
    //    $('#' + id).empty();
    //}
    console.log('id='+id);
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://launchermeta.mojang.com/mc/game/version_manifest.json'
    }).done(function(data) { window.data1 = data; console.log(data1);
        progress(0.5);
        let url, type, date;
        for (let i = 0; i < data.length; i++) {
            let version = data[i];
            date = moment(version.releaseTime).format('DD MMM YYYY, HH:mm:ss [UTC]');
            if (id === 'all') {
                $('#version').addClass('hide');
                $('#list').removeClass('hide');
                $('#list').append(`<tr>
                    <td>${version.id}</td>
                    <td>${version.type}</td>
                    <td>${date}</td>
                    <td><a href="javascript:getInfo(${version.id})">Generate</a></td>
                </tr>`);
            } else if (version.id == id){
                url = version.url;
                type = version.type;
            }
        }
        if (id !== 'all') {
            $('#list').addClass('hide');
            $('#version').removeClass('hide');
            $('#title').html(id);
            $('#version').append(`
                <td>${type || ''}</td>
                <td>${date || ''}</td>
            `);
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/' + url
            }).done(function(data) { window.data2 = data; console.log(data2);
                let download = data.downloads;
                $('#version').append(`
                    <td><a href="${download.client.url}" target="_blank">Client</a></td>
                    <td><a href="${url}" target="_blank">JSON</a></td>
                    <td><a href="${download.server.url}" target="_blank">Server</a></td>
                    <td><a href="${download.client_mappings.url}" target="_blank">Client</a></td>
                    <td><a href="${download.server_mappings.url}" target="_blank">Server</a></td>
                `);
            }).fail(function() {
                console.error(url + " did not work")
                complete();
            });
        }
        progress(1);
    }).fail(function() {
        complete();
    });
}

/* Copyright © Nixinova 2020 */