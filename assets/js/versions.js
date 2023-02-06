function progress(val) {
    $('#progress').attr('value', val);
}

function complete() {
    progress(1);
    setTimeout(function () {
        $('#loading').addClass('hide');
    }, 250);
}

function phase(phase, version) {
    switch (phase) {
        case "release": return "Release";
        case "snapshot": return "Snapshot";
        case "old_beta": return "Beta";
        case "old_alpha": {
            if (version.startsWith('a')) return "Alpha";
            else if (version.startsWith('inf')) return "Infdev";
            else if (version.startsWith('c')) return "Classic";
            else if (version.startsWith('rd')) return "Pre-Classic"
            else return phase;
        }
    }
}

async function initial() {
    const data = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(data => data.json());
    for (const version of data.versions) {
        $('#input-version').append(`\n<option>${version.id}</option>`);
    }
};

async function getInfo(id) {
    $('#loading').removeClass('hide');
    progress(0);
    for (let id of sections) {
        $('#' + id).empty();
    }

    const versionsData = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(data => data.json());
    progress(0.5);
    let url, type, date;
    for (const version of versionsData.versions) {
        let versionDate = moment(version.releaseTime).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
        let versionType = phase(version.type, version.id);
        if (id === 'all') {
            $('#version').addClass('hide');
            $('#list').removeClass('hide');
            $('#list tbody').append(`<tr>
                <td>${version.id}</td>
                <td>${versionType}</td>
                <td><samp><time datetime="${version.releaseTime}Z">${versionDate}</time></samp></td>
                <td><a href="javascript:getInfo('${version.id}')">Generate</a></td>
            </tr>`);
        }
        else if (version.id === id) {
            url = version.url;
            type = versionType;
            date = versionDate;
        }
    }
    if (id !== 'all' && url) {
        $('#list').addClass('hide');
        $('#version').removeClass('hide');
        $('#title').html(id);

        const versionData = await fetch(url).then(data => data.json());
        let download = versionData.downloads;
        let server = download.server;
        let client_mappings = download.client_mappings;
        let server_mappings = download.server_mappings;
        $('#version tbody').append(`
            <tr>
                <td>${type || ''}</td>
                <td><samp><time datetime="${date || ''}">${date || ''}</time></samp></td>
                <td><a href="${download.client.url}" target="client">Client</a></td>
                <td><a href="${url}" target="json">JSON</a></td>
                <td>${server ? `<a href="${server.url}" target="server">Server</a>` : 'N/A'}</td>
                <td>${client_mappings ? `<a href="${client_mappings.url}" target="clientmap">Client</a>` : 'N/A'}</td>
                <td>${server_mappings ? `<a href="${server_mappings.url}" target="servermap">Server</a>` : 'N/A'}</td>
            </tr>
        `);
        progress(1);
        complete();
    }
    else {
        progress(1);
        complete();
    }
}

/* Copyright © Nixinova 2021 */
