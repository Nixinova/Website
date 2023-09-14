const API_KEY = process.env.LASTFM_API_KEY;

exports.handler = async (event) => {
    return {
        status: 200,
        body: JSON.stringify({token: API_KEY}),
    }
};