const NUM_VIDEOS = 2;
export default async () => {
    const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCkBbTlppb8XHxI2rFryB1dQ';

    const xml = await fetch(url).then(x => x.text())
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    const videoIds = [...doc.getElementsByTagNameNS(
        'http://www.youtube.com/xml/schemas/2015',
        'videoId'
    )]
        .slice(0, NUM_VIDEOS)
        .map(el => el.textContent);

    return Response.json(videoIds, {
        headers: {
            'Cache-Control': 'public, max-age=300'
        }
    });
};
