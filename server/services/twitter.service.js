const fetch = require('node-fetch');

async function getTwitterTweets(params) {
    const response = await fetch(`${process.env.TWITTER_API_URL}?q=%23${params.hashTag}&include_entities=true&tweet_mode=extended`, {
        headers: {
            'Authorization': `Bearer ${process.env.TWITTER_TOKEN}`
        }
    })
    const tweetInfo = await response.json();
    return tweetInfo;
}

module.exports = {
    getTwitterTweets
}
