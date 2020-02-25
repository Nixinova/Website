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

function getInfo() {
    $('#loading').removeClass('hide');
    $('#output').addClass('hide');
    progress(0);
    for (let id of sections) {
        $('#' + id).empty();
    }
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://launchermeta.mojang.com/mc/game/version_manifest.json'
    }).done(function(data) {
        let versions = data.versions;
        for (let version of versions) {
            $('#output').append(`<tr>
                <td>${version.id}</td>
                <td>${version.type}</td>
                <td>${moment(version.releaseTime).format('DD MMM YYYY [at] HH:mm:ss [UTC]')}</td>
                <td><a href="${version.url}" title="View ${version.id}.json" target="_blank">View</a></td>
            </tr>`);
        }
    }).fail(function() {
        complete();
    });
}

/* Copyright © Nixinova 2020 */