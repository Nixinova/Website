const API_KEY = process.env.LASTFM_API_KEY;

const handler = async (event) => {
    try {
        const query = decodeURIComponent(event.queryStringParameters.query);
        const url = `https://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}&${query}`;
        const response = await fetch(url);
        const data = await response.json();
        const obj = {
            statusCode: 200,
            body: JSON.stringify({ data }),
        };
      return obj;
    } catch (error) {
        const obj = {
          statusCode: 500,
          body: { error: error.toString() },
        };
      return obj;
    }
};

module.exports = { handler };
