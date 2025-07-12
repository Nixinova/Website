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
    const data = await getVersionsData();
    let optionsHtml = '';
    for (const version of data.versions) {
        optionsHtml += `<option>${version.id}</option>`;
    }
    $('#input-version').append(optionsHtml);
};

async function getInfo(id) {
    const isLoadingAll = id === 'all';

    $('#loading').removeClass('hide');
    for (let id of sections) {
        $('#' + id).empty();
    }

    const versionsData = await getVersionsData();

    let url, type, date;
    let allVersionsHtml = '';
    for (const version of versionsData.versions) {
        let versionDate = moment(version.releaseTime).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
        let versionType = phase(version.type, version.id);
        if (isLoadingAll) {
            allVersionsHtml += `<tr>
                <td>${version.id}</td>
                <td>${versionType}</td>
                <td><samp><time datetime="${version.releaseTime}Z">${versionDate}</time></samp></td>
                <td><a href="javascript:getInfo('${version.id}')">Generate</a></td>
            </tr>`
        }
        else if (version.id === id) {
            url = version.url;
            type = versionType;
            date = versionDate;
            break;
        }
    }
    if (isLoadingAll) {
        $('#version').addClass('hide');
        $('#list').removeClass('hide');
        $('#list tbody').append(allVersionsHtml);
    }
    else if (url) {
        $('#list').addClass('hide');
        $('#version').removeClass('hide');
        $('#title').html(id);

        const versionData = await fetch(url).then(data => data.json());
        progress(0.7);

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
    }
}

async function getVersionsData() {
    var data = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json')
    var json = await data.json();
    return json;
}

/* Copyright © Nixinova 2025 */
