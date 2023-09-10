async function getData(query) {
    const response = await fetch(`/.netlify/functions/lastfm-request?query=${encodeURIComponent(query)}`);
    const { data } = await response.json();
    return data;
}

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

async function getDualTags(username, tag1, tag2) {
    const tracks1 = await getTagTracks(username, tag1);
    const tracks2 = await getTagTracks(username, tag2);
    const commonTracks = tracks1.filter(track => tracks2.includes(track));
    console.log(commonTracks);
    return commonTracks;
}
