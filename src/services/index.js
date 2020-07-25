import axios from 'axios';

import { getTweets } from '../helpers/api-url';

class TweetApi {
    async getTweets () {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            let tweets = await axios.get(
                getTweets, config
            );
            return tweets;
        } catch (error) {
            return error;
        }
    }
}

export default new TweetApi();
