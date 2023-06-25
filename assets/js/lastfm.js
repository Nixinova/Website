process = { env: { LASTFM_API_KEY: "cd66cb9b3bbd058aeb4f3952090a665f" } }

async function lastfm(tag1, tag2) {

    const URL = tag => `https://ws.audioscrobbler.com/2.0/?method=user.getpersonaltags&user=Nixinova&tag=${encodeURIComponent(tag)}&limit=500&taggingtype=track&api_key=${process.env.LASTFM_API_KEY}&format=json`;

    const data1 = await fetch(URL(tag1)).then(data => data.json());
    const data2 = await fetch(URL(tag2)).then(data => data.json());
    const tracksInfo1 = data1.taggings.tracks.track;
    const tracksInfo2 = data2.taggings.tracks.track;

    const getTracks = tracks => tracks.filter(track => track.artist).map(track => track.artist ? `${track.artist.name} - ${track.name}` : track);

    const commonTracks = [];

    const tracks1 = getTracks(tracksInfo1)
    const tracks2 = getTracks(tracksInfo2);
    console.log(tracks1, tracks2);

    for (const track of tracks1) {
        if (tracks2.includes(track))
            commonTracks.push(track);
    }

    console.log(commonTracks)

}

/* Copyright © Nixinova 2023 */
