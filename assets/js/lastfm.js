const MAX_TAGS = 5;
let apiKey;
let sessionToken;

document.addEventListener('DOMContentLoaded', async function () {
    apiKey = await getApiKey();
    sessionToken = new URLSearchParams(location.search).get('token');
    // remove token from url
    history.pushState(null, null, location.href.replace(/[?&]token=\S+/, ''));
});

function formatLastfmLink(trackStr) {
    const [artist, track] = trackStr.split('/_/');
    const encodePart = part => part.replace(/ /g, '+').replace(/[/\\]/g, char => encodeURIComponent(char));
    return [
        `<b><a href="https://last.fm/music/${encodePart(artist)}">${artist}</a></b>`,
        `<a href="https://last.fm/music/${encodePart(artist)}/_/${encodePart(track)}">${track}</a>`,
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
    return API_KEY = data.token;
}

async function genApiSig(params) {
    const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});

    const paramString = Object.entries(sortedParams).map(([key, value]) => `${key}${value}`).join('');
    const apiSig = await fetch('/.netlify/functions/lastfm-sign?string=' + paramString).then(res => res.json()).then(obj => obj.sig);
    return apiSig;
}

/** @note Redirects the user */
async function getRequestToken() {
    const apiKey = await getApiKey();
    const lastfmAuthURL = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${location.href}`;
    location.href = lastfmAuthURL;
}

async function getSessionKey(token) {
    try {
        const method = 'auth.getSession';
        const apiSig = genApiSig({ method, token: sessionToken });
        const data = await getData(`method=${method}&token=${sessionToken}&api_sig=${apiSig}`);
        return data.session?.key ?? null;
    }
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}

/** @returns Array<`${artist}/_/${name}`> */
async function getTagTracks(username, tag) {
    try {
        const data = await getData(`method=user.getpersonaltags&taggingtype=track&user=${username}&tag=${tag}&limit=2000`);

        if (data.error) {
            console.error('Error:', data.message);
        }
        else {
            const tracks = data.taggings.tracks.track;
            const trackParts = tracks.map(track => track.artist.name + '/_/' + track.name);
            return trackParts;
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    return [];
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

    try {
        const method = 'track.addTags';
        const sessionKey = await getSessionKey(sessionToken);
        const apiSig = await genApiSig({ method, artist, track, tags, api_key: apiKey, sk: sessionKey });
        params.api_sig = apiSig;

        const response = await fetch('https://ws.audioscrobbler.com/2.0/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(params),
        });

        const data = await response.text();
        console.log(data);
    }
    catch (error) {
        console.error('Error tagging track:', error);
    }
}

async function getFromForm() {
    const username = $('#username').val();
    const tagsStr = $('#tags').val();
    const tags = tagsStr.split(',').map(tag => tag.trim());

    if (!username)
        return alert('No username inputted');
    if (!tagsStr)
        return alert('No tags inputted');
    if (tags.length > MAX_TAGS)
        return alert('Too many tags: max of ' + MAX_TAGS);

    const tracks = await getCommonTaggedTracks(username, ...tags);
    const formattedTracks = tracks.sort().map(formatLastfmLink);
    const desc = `${username}'s tracks tagged ${tags.map(tag => `"${tag}"`).join(' & ')}`;
    const output = `${desc} <ul>${formattedTracks.map(track => `<li>${track}</li>`).join('')}</ul>`;
    $('output').html(output);
}

/* Copyright © Nixinova 2023 */
