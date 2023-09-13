const API_KEY = process.env.LASTFM_API_KEY;
const WS = 'https://ws.audioscrobbler.com/2.0/';

const handler = async (event) => {
    try {
        const query = decodeURIComponent(event.queryStringParameters.query);
        const returnUrlOnly = decodeURIComponent(event.queryStringParameters.returnUrl);
        const url = `${WS}?api_key=${API_KEY}&${query}`;
        let data;
        if (returnUrlOnly) {
            data = url;
        }
        else{
            const response = await fetch(url);
            const data = await response.json();
        }
        const obj = {
            statusCode: 200,
            body: JSON.stringify({ data }),
        };
        return obj;
    }
    catch (err) {
        const obj = {
          statusCode: 500,
          body: JSON.stringify({ error: err }),
        };
        return obj;
    }
};

module.exports = { handler };
