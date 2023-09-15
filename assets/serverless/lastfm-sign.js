const crypto = require('crypto');

const API_SECRET = process.env.LASTFM_API_SECRET;

const handler = async (event) => {
    const input = event.queryStringParameters.string;
    const newString = input + API_SECRET;
    const hashed = crypto.createHash('md5').update(newString).digest('hex');
    return {
        statusCode: 200,
        body: JSON.stringify(hashed),
    }
};

module.exports = { handler };
