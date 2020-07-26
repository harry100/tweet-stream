const fetch = require('node-fetch');
const qs = require('query-string');

async function getTwitterTweets(params) {
    let fetchEndPoint;

    if (params.max_id) {
        let queryString = qs.stringify(params)
        fetchEndPoint = `${process.env.TWITTER_API_URL}?${queryString}&tweet_mode=extended`
    } else {
        fetchEndPoint = `${process.env.TWITTER_API_URL}?q=%23${params.hashTag}&include_entities=true&tweet_mode=extended`
    }

    const response = await fetch(`${fetchEndPoint}`, {
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
