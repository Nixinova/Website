const API_KEY = process.env.LASTFM_API_KEY;

const handler = async (event) => {
    try {
        const urlBase = decodeURI(event.queryStringParameters.base);
        const query = decodeURIComponent(event.queryStringParameters.query);
        const url = `${urlBase}?api_key=${API_KEY}&${query}`;
        const response = await fetch(url);
        const data = await response.json();
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
