const MAX_TAGS = 5;
let apiKey;
let sessionToken;

document.addEventListener('DOMContentLoaded', async function () {
    apiKey = await getApiKey();
    sessionToken = new URLSearchParams(location.search).get('token');
    if (sessionToken)
        ['#authenticate', '#authenticated'].forEach(id => $(id).toggleClass('hide'));
    // remove token from url
    history.pushState(null, null, location.href.replace(/[?&]token=\S+/, ''));
});

function formatLastfmUrl(url) {
    const urlParts = url.split('/');
    const artist = urlParts[4];
    const track = urlParts[6];
    const decodePart = part => decodeURI(part).replace(/\+/g, ' ');
    return [
        `<b><a href="https://last.fm/music/${artist}">${decodePart(artist)}</a></b>`,
        `<a href="https://last.fm/music/${artist}/_/${track}">${decodePart(track)}</a>`,
    ].join(' - ');
}

async function getData(query) {
    const apiKey = await getApiKey();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?api_key=${apiKey}&format=json&${query}`);
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
    const apiSig = await genApiSig({ method, token: sessionToken });
    const data = await getData(`method=${method}&token=${sessionToken}&api_sig=${apiSig}`);
    return data.session?.key ?? null;
}

/** @returns Array<`${artist}/_/${name}`> */
async function getTagTracks(username, tag) {
    const data = await getData(`method=user.getpersonaltags&taggingtype=track&user=${username}&tag=${tag}&limit=2000`);

    const tracks = data.taggings.tracks.track;
    const trackURLs = tracks.map(track => track.url);
    return trackURLs;
}

async function getCommonTaggedTracks(username, ...tags) {
    const tracksCount = {};
    for (const tag of tags) {
        const tracks = await getTagTracks(username, tag);
        for (const track of tracks) {
            tracksCount[track] ??= 0;
            tracksCount[track]++;
        }
    }
    const common = Object.keys(tracksCount).filter(track => tracksCount[track] === tags.length);
    return common;
}

async function tagTrack(artist, track, tags) {
    if (!sessionToken)
        return alert('Not authenticated yet');

    const method = 'track.addTags';
    const sessionKey = await getSessionKey();
    const params = { method, artist, track, tags, api_key: apiKey, sk: sessionKey };
    const apiSig = await genApiSig(params);
    params.api_sig = apiSig;
    params.format = 'json';

    const response = await fetch('https://ws.audioscrobbler.com/2.0/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params),
    });

    const data = await response.json();
    console.log(data);
}

async function formGetTaggedTracks() {
    const username = $('#username').val();
    const tagsStr = $('#tags').val();
    const tags = tagsStr.split(',').map(tag => tag.trim());

    if (!username)
        return alert('No username inputted');
    if (!tagsStr)
        return alert('No tags inputted');
    if (tags.length > MAX_TAGS)
        return alert('Too many tags: max of ' + MAX_TAGS);

    let trackURLs;
    try {
        trackURLs = await getCommonTaggedTracks(username, ...tags);
    }
    catch (err) {
        return alert('Error: ' + err.message);
    }
    const urlToPlain = url => decodeURI(url).replace(/^.+last.fm.music./, '').replace(/\+/g, ' ');
    const tracks = trackURLs.map(urlToPlain).sort();
    const plainTracks = tracks.map(track => track.replace('/_/', ' - '));

    const desc = `${username}'s tracks tagged ${tags.map(tag => `"${tag}"`).join(' & ')}`;
    $('#matching-tracks-subtitle').html(desc);
    $('#matching-tracks-plain').html(
        plainTracks.join(', ')
    );
    $('#matching-tracks-formatted').html(
        `<ul>${trackURLs.map(formatLastfmUrl).sort().map(track => `<li>${track}</li>`).join('')}</ul>`
    );
}

/* Copyright © Nixinova 2023 */
