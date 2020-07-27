import React, { useState, useEffect } from 'react';
// import { isEqual } from 'lodash';
// import qs from 'query-string';

import tweetService from '../services';
import TweetComponent from './Tweet';

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState([]);
    // const [nextTweetUrl, setNextTweetUrl] = useState(null);

    // const getTweets = () => {
    //     tweetService.getTweets({ hashTag: 'covid' })
    //         .then(res => {
    //             let currentTweets = [...tweets]
    //             for (t in currentTweets) {
    //                 for ( nt in res.statuses) {
    //                     if (!isEqual(t, nt)) {
    //                         currentTweets.push(nt)
    //                     }
    //                 }
    //             }
    //             setTweets(currentTweets)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    // polling twitter api every 10 seconds
    useEffect(() => {
        setLoading(true);
        tweetService.getTweets(`hashTag=covid`)
            .then(res => {
                setTweets(res.statuses);
                setLoading(false);
                let firstNextUrl = res.search_metadata.next_results;
                let firstResponse = res.statuses;
                // let next_url;
                // if (firstNextUrl !== next_url)
                const interval = setInterval(() => {
                    setLoading(true);
                    console.log(firstNextUrl);
                    tweetService.getTweets(firstNextUrl)
                        .then(response => {
                            setLoading(false);
                            firstNextUrl = response.search_metadata.next_results;
                            firstResponse = [...response.statuses, ...firstResponse];
                            setTweets(firstResponse);
                        });
                }, 10000);
                // works like componentWillUnmount
                return () => clearInterval(interval);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    return (
        <div className="container">
            <div className="page-header heading">
                <h1> Recent Tweets </h1>
            </div>
            {
                loading ?
                    <div className="loader-cont">
                        <div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    ''
            }
            {tweets && tweets.length > 0 ?
                tweets.map(t => {
                    return <TweetComponent key={t.user.id} tweet={t} />;
                }) : ''
            }
        </div>
    );
};

export default TweetList;
