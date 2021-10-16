const sections = ['username', 'uuid', 'username-history', 'skin', 'cape'];
const skinURLs = {}, capeURLs = {};

function error(err) {
    if (err === 'PlayerNotFoundError') {
        $('#username').empty();
        $('#uuid').empty();
        $('#username-history').html('Could not find player');
        $('#skin').empty();
    } else if (err === 'SkinNotFoundError') {
        $('#skin').empty();
    } else {
        $('output').html('Unknown error');
    }
    throw err;
}

function progress(val) {
    $('progress').attr('value', val);
}

function complete() {
    progress(1);
    setTimeout(() => {
        $('#loading').addClass('hide');
        $('output').removeClass('hide');
    }, 100);
}

async function getInfo(playerName) {
    $('#loading').removeClass('hide');
    $('output').addClass('hide');
    progress(0);
    sections.forEach(id => $('#' + id).empty());

    const query = location.search.substr(1);
    if (!playerName && query) playerName = query;

    // Retrieve player data
    const playerData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(data => data.json()).catch(() => {
        complete();
        error('PlayerNotFoundError');
    });
    progress(1 / 3);
    if (!playerData) error('PlayerNotFoundError');
    const uuid = playerData.id;
    const uuidFormatted = [
        uuid.substring(0, 8),
        uuid.substring(8, 12), uuid.substring(12, 16), uuid.substring(16, 20),
        uuid.substring(20, 32),
    ].join('-');

    // Retrieve username data
    const usernameData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.mojang.com/user/profiles/${uuid}/names`).then(data => data.json()).catch(() => {
        complete();
        error('PlayerNotFoundError');
    });
    progress(2 / 3);
    $('#username-history').empty();
    const username = usernameData[usernameData.length - 1].name;
    $('#username').html(username);
    $('#uuid').html(uuidFormatted);
    for (let i = 0; i < usernameData.length; i++) {
        const name = usernameData[i].name;
        const datestamp = usernameData[i].changedToAt;
        const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'long', timeZone: 'UTC' }).format(datestamp);
        const dateHtml = `<time datetime="${datestamp ? new Date(datestamp).toISOString() : ''}">${date}</time>`
        const nameHtml = `<strong>${name}</strong>`;
        const daysDiff = i > 0 && (new Date(datestamp) - new Date(usernameData[i - 1].changedToAt)) / 1e3 / 86400;
        let historyEntry;
        if (i === 0 && usernameData.length === 1) {
            historyEntry = `<li>Current name: ${nameHtml}</li>`;
        } else if (i === usernameData.length - 1) {
            historyEntry = `<li>${nameHtml} (current)<br class="mobileonly"/> (${daysDiff} days; changed ${dateHtml})</li>`;
        } else if (i === 0) {
            historyEntry = `<li>${nameHtml}</li>`;
        } else {
            historyEntry = `<li>${nameHtml}<br class="mobileonly"/> (${daysDiff} days; changed ${dateHtml})</li>`;
        }
        $('#username-history').append(historyEntry);
    }

    const skinData = await fetch(`https://cors-anywhere.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).then(data => data.json()).catch(() => {
        complete();
        if (skinURLs[username] || capeURLs[username]) {
            $('#skin').html(`
                <h3>Skin</h3>
                <img src="${skinURLs[username]}" alt="${username}'s skin">
            `);
            if (capeURLs[username]) {
                $('#cape').html(`
                    <h3>Cape</h3>
                    <img src="${capeURLs[username]}" alt="${username}'s cape">
                `);
            }
            throw 'Completed';
        } else {
            error('SkinNotFoundError');
        }
    });
    let encoded_data = skinData.properties[0].value;
    let decoded_data = JSON.parse(atob(encoded_data));
    const skinURL = decoded_data.textures.SKIN.url.replace('http:', 'https:');
    if (username) skinURLs[username] = skinURL;
    $('#skin').html(`
        <h3>Skin</h3>
        <img src="${skinURL}" alt="${username}'s skin">
    `);
    const cape = decoded_data.textures.CAPE;
    if (cape) {
        const capeURL = cape.url.replace('http:', 'https:');
        if (username) capeURLs[username] = capeURL;
        $('#cape').html(`
            <h3>Cape</h3>
            <img src="${capeURL}" alt="${username}'s cape">
        `);
    }
    complete();

}

$(function () {
    let query = location.search.substr(1);
    if (query) getInfo(query);
    $('#input-username').val(query);
});

/* Copyright © Nixinova 2021 */
