import React, { useState, useEffect } from 'react';

import tweetService from '../services';
import TweetComponent from './Tweet';

const TweetList = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        tweetService.getTweets({ hashTag: 'covid' })
            .then(res => {
                setTweets(res.statuses);
                console.log(tweets);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container">
            <div className="page-header heading">
                <h1> Recent Tweets </h1>
            </div>
            {tweets && tweets.length > 0 ?
                tweets.map(t => {
                    return <TweetComponent tweet={t} />;
                }) : ''
            }
        </div>
    );
};

export default TweetList;
