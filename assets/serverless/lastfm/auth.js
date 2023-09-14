const API_KEY = process.env.LASTFM_API_KEY;

exports.handler = async (event) => {
    try {
        const cbUrl = decodeURI(event.queryStringParameters.callbackUrl);
        const lastfmAuthURL = `https://www.last.fm/api/auth/?api_key=${API_KEY}&cb=${cbUrl}`;
        // redirect
        return {
            statusCode: 302,
            headers: {
                Location: lastfmAuthURL,
            },
        };
    }
    catch (err) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: err.toString() }),
        };
    }
};
