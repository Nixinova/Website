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

$(function () {
    let query = location.search.substr(1);
    if (query) getInfo(query);
    $('#input-username').val(query);
});

let skinURLs = {}, capeURLs = {};
async function getInfo(playerName) {
    $('#loading').removeClass('hide');
    $('output').addClass('hide');
    progress(0);
    sections.forEach(id => $('#' + id).empty());

    let query = location.search.substr(1);
    if (!playerName && query) playerName = query;

    // Retrieve player data
    const playerData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(data => data.json()).catch(() => {
        complete();
        throw error('PlayerNotFoundError');
    });
    progress(1 / 3);
    if (!playerData) error('PlayerNotFoundError');
    let username, uuid = playerData.id;
    let uuidFormatted = [
        uuid.substring(0, 8),
        uuid.substring(8, 12), uuid.substring(12, 16), uuid.substring(16, 20),
        uuid.substring(20, 32),
    ].join('-');

    // Retrieve username data
    const usernameData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.mojang.com/user/profiles/${uuid}/names`).then(data => data.json()).catch(() => {
        complete();
        throw error('PlayerNotFoundError');
    });
    progress(2 / 3);
    $('#username-history').empty();
    username = usernameData[usernameData.length - 1].name;
    $('#username').html(username);
    $('#uuid').html(uuidFormatted);
    for (let i in usernameData) {
        let name = usernameData[i].name;
        let date = moment(usernameData[i].changedToAt).format('DD MMM YYYY [at] HH:mm:ss [UTC]');
        let historyEntry;
        if (i === 0 && usernameData.length === 1) {
            historyEntry = `<li>Current name: ${name}</li>`;
        } else if (i === usernameData.length - 1) {
            historyEntry = `<li>Name #${parseInt(i) + 1} (current): ${name} <br class="mobileonly"/>(changed on ${date})</li>`;
        } else if (i === 0) {
            historyEntry = `<li>Name #1: ${name}</li>`;
        } else {
            historyEntry = `<li>Name #${parseInt(i) + 1}: ${name} <br class="mobileonly"/>(changed on ${date})</li>`;
        }
        $('#username-history').append(historyEntry);
    }

    const skinData = await fetch(`https://cors-anywhere.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).then(data => data.json()).catch(() => {
        complete();
        if (skinURLs[username] || capeURLs[username]) {
            $('#skin').html(`
                <img src="${skinURLs[username]}" alt="${username}'s skin">
            `);
            if (capeURLs[username]) {
                $('#cape').html(`
                    <img src="${capeURLs[username]}" alt="${username}'s cape">
                `);
            }
            throw 'Completed';
        } else {
            throw error('SkinNotFoundError');
        }
    });
    let encoded_data = skinData.properties[0].value;
    let decoded_data = JSON.parse(atob(encoded_data));
    let skinURL = decoded_data.textures.SKIN.url.replace('http:', 'https:');
    if (username) skinURLs[username] = skinURL;
    $('#skin').html(`
        <img src="${skinURL}" alt="${username}'s skin">
    `);
    if (cape = decoded_data.textures.CAPE) {
        capeURL = cape.url.replace('http:', 'https:');
        if (username) capeURLs[username] = capeURL;
        $('#cape').html(`
            <img src="${capeURL}" alt="${username}'s cape">
        `);
    }
    complete();

}

/* Copyright © Nixinova 2021 */
