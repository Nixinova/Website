const API_KEY = process.env.LASTFM_API_KEY;

const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({token: API_KEY}),
    }
};

module.exports = { handler };
