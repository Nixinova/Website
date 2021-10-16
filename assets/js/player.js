const API_ROOT = 'https://cors-anywhere.herokuapp.com/https://api.mojang.com';
const sections = ['username', 'uuid', 'username-history', 'skin', 'cape'];
const skinURLs = {}, capeURLs = {};

function error(err) {
    if (err === 'PlayerNotFoundError') {
        $('#username-table').addClass('hide');
        $('#username').empty();
        $('#uuid').empty();
        $('#skin').empty();
        $('#error').html('Could not find player');
    } else if (err === 'SkinNotFoundError') {
        $('#skin').empty();
    } else {
        $('#error').html('Unknown error');
    }
    complete();
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
    $('.clearable').empty();
    $('#loading').removeClass('hide');
    $('output').addClass('hide');
    progress(0);
    sections.forEach(id => $('#' + id).empty());

    const query = location.search.substr(1);
    if (!playerName && query) playerName = query;

    // Retrieve player data
    const playerData = await fetch(`${API_ROOT}/users/profiles/minecraft/${playerName}`).then(data => data.json()).catch(() => error('PlayerNotFoundError'));
    progress(1 / 3);
    if (!playerData) error('PlayerNotFoundError');
    const uuid = playerData.id;
    const uuidFormatted = [
        uuid.substring(0, 8),
        uuid.substring(8, 12), uuid.substring(12, 16), uuid.substring(16, 20),
        uuid.substring(20, 32),
    ].join('-');

    // Retrieve username data
    const usernameData = await fetch(`${API_ROOT}/user/profiles/${uuid}/names`).then(data => data.json()).catch(() => error('PlayerNotFoundError'));
    progress(2 / 3);
    const username = usernameData[usernameData.length - 1].name;
    $('#username').html(username);
    $('#uuid').html(uuidFormatted);
    $('#username-table').removeClass('hide');
    const intl = (data = {}) => new Intl.DateTimeFormat('en-GB', { ...data, timeZone: 'UTC' });
    const formatDate = stamp => stamp ? intl({ dateStyle: 'medium' }).format(stamp) : '';
    const formatTime = stamp => stamp ? intl({ timeStyle: 'long' }).format(stamp).replace('UTC', '') : '';
    const nameCounts = {};
    for (let i = 0; i < usernameData.length; i++) {
        const name = usernameData[i].name;
        nameCounts[name] = nameCounts[name] + 1 || 1;
        const datestamp = usernameData[i].changedToAt;
        const nextDatestamp = usernameData[i + 1]?.changedToAt;
        const daysDiff = Math.round((new Date(usernameData[i + 1]?.changedToAt ?? new Date()) - datestamp) / 1e3 / 86400);
        $('#username-history').append(`<tr>
            <td>${i + 1}</td>
            <td>
                <strong>${name}</strong>
                <small>${nameCounts[name] > 1 ? `(#${nameCounts[name]})` : ''}</small>
            </td>
            <td title="${datestamp ? new Date(datestamp).toISOString() : ''}"">
                ${formatDate(datestamp) || '(creation)'}<br>${formatTime(datestamp)}
            </td>
            <td title="${new Date(nextDatestamp ?? new Date()).toISOString()}">
                ${nextDatestamp ? `${formatDate(nextDatestamp)}<br>${formatTime(nextDatestamp)}` : '(current)'}
            </td>
            <td>
                ${!daysDiff ? '?' : daysDiff < 365 ? `${daysDiff} days` : `${Math.round(daysDiff / 365 * 10) / 10} years`}
            </td>
        </tr>`);
    }

    let skinFetched = false;
    const skinData = await fetch(`https://cors-anywhere.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).then(data => data.json()).catch(() => skinFetched = true);
    if (skinFetched) {
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
            return;
        } else {
            error('SkinNotFoundError');
        }
    }
    const encoded_data = skinData.properties[0].value;
    const decoded_data = JSON.parse(atob(encoded_data));
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
