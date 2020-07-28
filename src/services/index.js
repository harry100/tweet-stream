import axios from 'axios';
import qs from 'query-string';

import { getTweets } from '../helpers/api-url';


class TweetApi {
    async getTweets (params) {
        let p = qs.parse(params);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let tweets;
        try {
            if (p.max_id) {
                let queryString = qs.stringify(p);
                tweets = await axios.get(
                    `${getTweets}?${queryString}`
                );
            } else {
                tweets = await axios.get(
                    `${getTweets}?hashTag=${p.hashTag}`, config
                );
            }
            return tweets.data.data.tweetInformation;
        } catch (error) {
            return error;
        }
    }
}

export default new TweetApi();
