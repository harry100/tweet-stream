import axios from 'axios';

import { getTweets } from '../helpers/api-url';


class TweetApi {
    async getTweets (params) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            let tweets = await axios.get(
                `${getTweets}?hashTag=${params.hashTag}`, config
            );
            return tweets;
        } catch (error) {
            return error;
        }
    }
}

export default new TweetApi();
