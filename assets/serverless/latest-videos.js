const NUM_VIDEOS = 2;
export default async () => {
    const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCkBbTlppb8XHxI2rFryB1dQ';
    const xml = await fetch(url).then(x => x.text())
    const videoIds = [...xml.match(/(?<=videoId>).+(?=<\/)/g)];
    const resultIds = videoIds.slice(0, NUM_VIDEOS);

    return Response.json(resultIds, {
        headers: {
            'Cache-Control': 'public, max-age=300'
        }
    });
};
