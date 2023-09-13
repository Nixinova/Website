function formatLastfmLink(trackStr) {
    const [artist, track] = trackStr.split('/_/');
    return [
        `<a href="https://last.fm/music/${artist}">${artist}</a>`,
        `<a href="https://last.fm/music/${artist}/_/${track}">${track}</a>`,
    ].join(' - ');
}

async function getData(query) {
    const response = await fetch(`/.netlify/functions/lastfm-request?query=${encodeURIComponent(query)}`);
    const { data } = await response.json();
    return data;
}

/** @returns Array<`${artist}/_/${name}`> */
async function getTagTracks(username, tag) {
    try {
        const data = await getData(`method=user.getpersonaltags&taggingtype=track&user=${username}&tag=${tag}&format=json&limit=2000`);

        if (data.error) {
            console.error('Error:', data.message);
        } else {
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
    const tags = $('#tags').val().split(/\s*,\s*/);
    const tracks = await getCommonTaggedTracks(username, ...tags);
    const formattedTracks = tracks.map(formatLastfmLink);
    $('output').html(`<ul>${formattedTracks.map(track => `<li>${track}</li>`).join('')}</ul>`);
}

/* Copyright © Nixinova 2023 */
