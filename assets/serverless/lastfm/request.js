const API_KEY = process.env.LASTFM_API_KEY;
const WS = 'https://ws.audioscrobbler.com/2.0/';

exports.handler = async (event) => {
    try {
        const query = decodeURIComponent(event.queryStringParameters.query);
        const url = `${WS}?api_key=${API_KEY}&format=json&${query}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    }
    catch (err) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: err.toString() }),
        };
    }
};
