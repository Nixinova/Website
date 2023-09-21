let apiKey;
let authToken;
let sessionKey;

document.addEventListener('DOMContentLoaded', async function () {
    apiKey = await getApiKey();

    // get session token
    authToken = new URLSearchParams(location.search).get('token');
    if (authToken) {
        sessionKey = await getSessionKey();
        ['#authenticate', '#authenticated'].forEach(id => $(id).toggleClass('hide'));
    }
    // remove token from url
    history.pushState(null, null, location.href.replace(/[?&]token=\S+/, ''));
});

function sort(array) {
    return array.sort(Intl.Collator().compare);
}

function csvToArray(str) {
    return str.split(',').map(tag => tag.trim()).filter(item => item);
}

function formatLastfmUrl(url) {
    const urlParts = url.split('/');
    const artist = urlParts[4];
    const album = urlParts[5];
    const track = urlParts[6];
    const decodePart = part => decodeURIComponent(part).replace(/\+/g, ' ');
    return (
        `<b><a href="https://last.fm/music/${artist}">${decodePart(artist)}</a></b>`
        + (album && album !== '_' ? ` / <a href="https://last.fm/music/${artist}/${album}">${decodePart(album)}</a>` : '')
        + (track ? ` - <a href="https://last.fm/music/${artist}/_/${track}">${decodePart(track)}</a>` : '')
    );
}

function urlToPlain(url) {
    return decodeURI(url).replace(/^.+last.fm.music./, '').replace(/\+/g, ' ');
}

async function getData(query) {
    const apiKey = await getApiKey();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?api_key=${apiKey}&format=json&${query}`);
    if (!response.ok) {
        console.error(response);
        throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function getApiKey() {
    const response = await fetch(`/.netlify/functions/lastfm-token`);
    const data = await response.json();
    return API_KEY = data;
}

// TODO error code 4 - This token has not been issued
async function genApiSig(params) {
    // add mandatory params
    params.api_key = await getApiKey();

    const paramString = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
    const response = await fetch('/.netlify/functions/lastfm-sign?string=' + paramString);
    const apiSig = await response.json();
    return apiSig;
}

/** @note Redirects the user */
async function getRequestToken() {
    const apiKey = await getApiKey();
    const lastfmAuthURL = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${location.href}`;
    location.href = lastfmAuthURL;
}

async function getSessionKey() {
    const method = 'auth.getSession';
    const apiSig = await genApiSig({ method, token: authToken });
    const data = await getData(`method=${method}&token=${authToken}&api_sig=${apiSig}`);
    return sessionKey = data.session?.key ?? null;
}

/** @returns Array<`${url}`> */
async function getTaggedItems(username, tag) {
    // TODO FIX: get(artist) fetches all artists of tagged tracks instead of tagged artists
    const itemURLs = { all: [], artist: [], album: [], track: [] };
    for (const type of [/*'artist',*/ 'album', 'track']) {
        const data = await getData(`method=user.getpersonaltags&taggingtype=${type}&user=${username}&tag=${tag}&limit=2000`);
        const urls = data.taggings[type + 's'][type].map(item => item.url);
        itemURLs[type] = urls;
        itemURLs.all.push(...urls);
    }

    return itemURLs;
}

async function getCommonTaggedItems(type = 'all', username, ...tags) {
    const itemsCount = {};
    for (const tag of tags) {
        const items = await getTaggedItems(username, tag).then(urls => urls[type]);
        for (const item of items) {
            itemsCount[item] ??= 0;
            itemsCount[item]++;
        }
    }
    const common = Object.keys(itemsCount).filter(item => itemsCount[item] === tags.length);
    return common;
}

async function getAllTaggedItems(type = 'all', username, ...tags) {
    const result = [];
    for (const tag of tags) {
        result.push(...await getTaggedItems(username, tag).then(urls => urls[type]));
    }
    return [...new Set(result)];
}

async function getLikedTracks(username) {
    const data = await getData(`method=user.getLovedTracks&user=${username}&limit=1000`);
    const urls = data.lovedtracks.track.map(track => track.url);
    return urls;
}

async function tagItem(type, tags, input) {
    if (!authToken)
    {
        return alert('Not authenticated yet');
    }

    for (const key of Object.keys(input))
        input[key] = decodeURIComponent(input[key]);

    const params = { method: type + '.addTags', ...input, tags, api_key: apiKey, sk: sessionKey };
    const apiSig = await genApiSig(params);
    params.api_sig = apiSig;
    params.format = 'json';

    const response = await fetch('https://ws.audioscrobbler.com/2.0/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params),
    });
    if (!response.ok) {
        console.error(response);
        throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
}

async function formGetTaggedTracks() {
    const MAX_TAGS = 5;

    const loading = $('#getter_loading');

    const mode = $('#gettagged_mode').val();
    const type = $('#gettagged_items').val();
    const username = $('#gettagged_username').val();
    const tags = csvToArray($('#gettagged_tags-include').val());
    const tagsExclude = csvToArray($('#gettagged_tags-exclude').val());

    if (!username || !tags.length)
        return alert('Please input all fields');
    if (tags.length > MAX_TAGS)
        return alert('Too many tags: max of ' + MAX_TAGS);

    let trackURLs;
    try {
        loading.text('Loading... (0/2)');
        const getItemsFunc = mode === 'and' ? getCommonTaggedItems : getAllTaggedItems;
        trackURLs = await getItemsFunc(type, username, ...tags);
        loading.text('Loading... (1/2)');
        if (tagsExclude.length) {
            const exclTrackURLs = await getItemsFunc(type, username, ...tagsExclude);
            trackURLs = trackURLs.filter(url => !exclTrackURLs.includes(url));
        }
        loading.text('Loading... (2/2)');
    }
    catch (err) {
        loading.text('');
        return alert('Error: ' + err.message);
    }
    const tracks = sort(trackURLs.map(urlToPlain));

    const linkTags = tags => tags.map(tag => `<a href="https://last.fm/user/${username}/tags/${tag}">${tag}</a>`);
    const fmtTags = tags => linkTags(tags).map(tag => `"${tag}"`).join(mode === 'and' ? ' + ' : ' / ');
    const desc = `From ${username} tagged ${fmtTags(tags)} ${tagsExclude.length ? ` and not ${fmtTags(tagsExclude)}` : ''}`;
    const plainContent = tracks.join(', ');
    const fmtdContent = `<ul>${sort(trackURLs.map(formatLastfmUrl)).map(track => `<li>${track}</li>`).join('')}</ul>`;
    $('#matchedtracks_subtitle').html(desc);
    $('#matchedtracks_plain').html(plainContent);
    $('#matchedtracks_formatted').html(fmtdContent);

    loading.text('');
}

async function formGetLikedTracks() {
    const loading = $('#getter_loading');

    const username = $('#getliked_username').val();
    if (!username)
        return alert('Please enter a username');

    let trackURLs;
    try {
        loading.text('Loading...');
        trackURLs = await getLikedTracks(username);
    }
    catch (err) {
        loading.text('');
        return alert('Error: ' + err.message);
    }
    const tracks = sort(trackURLs.map(urlToPlain));

    const desc = `${username}'s <a href="https://www.last.fm/user/${username}/loved">liked tracks</a>`;
    const plainContent = tracks.join(', ');
    const fmtdContent = `<ul>${sort(trackURLs.map(formatLastfmUrl)).map(track => `<li>${track}</li>`).join('')}</ul>`;
    $('#matchedtracks_subtitle').html(desc);
    $('#matchedtracks_plain').html(plainContent);
    $('#matchedtracks_formatted').html(fmtdContent);

    loading.text('');
}

async function formTagTracks() {
    const MAX_TAGS = 10;

    const loading = $('#addtags_loading');
    loading.text('Loading...');

    const tagLog = $('#tagtracks_log');
    const failLog = $('#tagtracks_log-failed');
    tagLog.html('');
    failLog.html('');

    const itemsList = csvToArray($('#addtags_tracks').val());
    const tags = csvToArray($('#addtags_tags').val());

    if (!itemsList.length || !tags.length)
        return alert('Please input all fields');
    if (tags.length > MAX_TAGS)
        return alert('Too many tags: max of ' + MAX_TAGS);

    let i = 0;
    for (const itemURL of itemsList) {
        const [artist, album, track] = itemURL.split('/');
        if (!track && !album) {
            // Artist tagging
            await tagItem('artist', tags, { artist })
                .then(() => {
                    tagLog.append(`${artist}: tagged with ${tags}\n`);
                })
                .catch((err) => {
                    console.error(err);
                    tagLog.append(`${artist}: could not tag with ${tags}\n`);
                    failLog.append(`${artist}\n`);
                })
        }
        else if (album && album !== '_') {
            // Album tagging
            await tagItem('album', tags, { artist, album })
                .then(() => {
                    tagLog.append(`${artist} / ${album}: tagged with ${tags}\n`);
                })
                .catch((err) => {
                    console.error(err);
                    tagLog.append(`${artist} / ${album}: could not tag with ${tags}\n`);
                    failLog.append(`${artist}/${album}\n`);
                })
        }
        else {
            // Track tagging
            await tagItem('track', tags, { artist, track })
                .then(() => {
                    tagLog.append(`${artist} - ${track}: tagged with ${tags}\n`);
                })
                .catch((err) => {
                    console.error(err);
                    tagLog.append(`${artist} - ${track}: could not tag with ${tags}\n`);
                    failLog.append(`${artist}/_/${track}\n`);
                })
        }
        loading.text(`Tagging... (${++i} / ${itemsList.length} done)`);
    }

    loading.text('');
}

// TODO: actually kill the request
function killTagAdding() {
    const tagLogContent = $('#tagtracks_log').val();
    alert(`Killing. \n Tags: \n ${tagLogContent} \n Press OK to reload`);
    location.reload();
}

function changeFetchForm() {
    const method = $('#fetching-method').val();
    $('.toggleable-form').addClass('hide');
    $(`#${method}_form`).removeClass('hide');
}

/* Copyright © Nixinova 2023 */
