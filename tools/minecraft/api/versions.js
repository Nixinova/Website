function error(err) {
}

function progress(val) {
    $('progress').attr('value',val);
}

function complete() {
    progress(1);
    setTimeout(function() {
        $('#loading').addClass('hide');
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
    progress(0);
    for (let id of sections) {
        $('#' + id).empty();
    }
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://launchermeta.mojang.com/mc/game/version_manifest.json'
    }).done(function(data) { window.data1 = data;
        progress(0.5);
        let url, type, date;
        for (let i = 0; i < data.versions.length; i++) {
            let version = data.versions[i];
            date = moment(version.releaseTime).format('YYYY-MM-DD HH:mm:ss');
            let versionType = version.type.charAt(0).toUpperCase() + version.type.slice(1);
            if (id === 'all') {
                $('#version').addClass('hide');
                $('#list').removeClass('hide');
                $('#list tbody').append(`<tr>
                    <td>${version.id}</td>
                    <td>${versionType}</td>
                    <td>${date}</td>
                    <td><a href="javascript:getInfo('${version.id}')">Generate</a></td>
                </tr>`);
            } else if (version.id == id){
                url = version.url;
                type = versionType;
            }
        }
        if (id !== 'all') {
            $('#list').addClass('hide');
            $('#version').removeClass('hide');
            $('#title').html(id);
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/' + url
            }).done(function(data) { window.data2 = data;
                let download = data.downloads;
                $('#version tbody').append(`<tr>
                    <td>${type || ''}</td>
                    <td>${date || ''}</td>
                    <td><a href="${download.client.url}" target="_blank">Client</a></td>
                    <td><a href="${url}" target="_blank">JSON</a></td>
                    <td><a href="${download.server.url}" target="_blank">Server</a></td>
                    <td><a href="${download.client_mappings.url}" target="_blank">Client</a></td>
                    <td><a href="${download.server_mappings.url}" target="_blank">Server</a></td>
                </tr>`);
            })
        }
        progress(1);
    });
    complete();
}

/* Copyright © Nixinova 2020 */