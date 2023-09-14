
function formatLastfmLink(trackStr) {
    const [artist, track] = trackStr.split('/_/');
    const encodePart = part => part.replace(/ /g, '+').replace(/[/\\]/g, char => encodeURIComponent(char));
    return [
        `<b><a href="https://last.fm/music/${encodePart(artist)}">${artist}</a></b>`,
        `<a href="https://last.fm/music/${encodePart(artist)}/_/${encodePart(track)}">${track}</a>`,
    ].join(' - ');
}

async function getData(query) {
    const response = await fetch(`/.netlify/functions/lastfm-request?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
}

async function getRequestToken() {
    fetch(`/.netlify/functions/lastfm-auth?callbackUrl=${encodeURI(location.href)}`);
}

async function getSessionKey(token) {
    try {
        const response = await getData(`auth.getSession&token=${token}`);
        const data = await response.json();

        if (data.session?.key) {
            const sessionKey = data.session.key;
            console.log('Session key obtained:', sessionKey);
            return sessionKey;
        }
        else {
            console.error('Failed to obtain a session key.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return null;
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
    } catch (error) {
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

async function getFromForm() {
    const username = $('#username').val();
    const tags = $('#tags').val().split(',').map(tag => tag.trim());
    const tracks = await getCommonTaggedTracks(username, ...tags);
    const formattedTracks = tracks.sort().map(formatLastfmLink);
    const desc = `${username}'s tracks tagged ${tags.map(tag => `"${tag}"`).join(' & ')}`;
    $('output').html(`<i>${desc}</i> <ul>${formattedTracks.map(track => `<li>${track}</li>`).join('')}</ul>`);
}

/* Copyright © Nixinova 2023 */
