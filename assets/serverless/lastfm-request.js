const API_KEY = process.env.LASTFM_API_KEY;
const WS = 'https://ws.audioscrobbler.com/2.0/';

const handler = async (event) => {
    try {
        const onlyApiKey = event.queryStringParameters.onlyApiKey;
        if (onlyApiKey) {
            return {
                statusCode: 200,
                body: JSON.stringify({ key: API_KEY }),
            };
        }

        const query = decodeURIComponent(event.queryStringParameters.query);
        const url = `${WS}?api_key=${API_KEY}&${query}`;
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
          body: err.toString(),
        };
    }
};

module.exports = { handler };
