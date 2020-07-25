import React, { useEffect } from 'react';
import tweetService from '../services';

const TweetList = () => {
    useEffect(() => {
        console.log('this is called');
        tweetService.getTweets()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <h1> Recent </h1>
        </>
    );
};

export default TweetList;
