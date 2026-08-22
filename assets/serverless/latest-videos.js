export default async () => {
    const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCkBbTlppb8XHxI2rFryB1dQ';
    const xml = await fetch(url).then(x => x.text())
    const videoIds = [...xml.match(/(?<=videoId>).+(?=<\/)/g)];

    return Response.json(videoIds, {
        headers: {
            'Cache-Control': 'public, max-age=300'
        }
    });
};
