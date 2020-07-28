import React, { useState, useEffect } from 'react';
// import { isEqual } from 'lodash';
// import qs from 'query-string';

import tweetService from '../services';
import TweetComponent from './Tweet';
import { set } from 'lodash';

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchHash, setSearchHash] = useState('covid');

    useEffect(() => {
        setLoading(true);
        tweetService.getTweets(`hashTag=${searchHash}`)
            .then(res => {
                setTweets(res.statuses);
                setLoading(false);
                getTweetsEveryX(res.search_metadata.next_results, res.statuses);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [searchHash]);

    //polling function
    const getTweetsEveryX = (hash, data) => {
        setClearHash()
        let nextUrl = hash;
        let firstResponse = data;
        const interval = setInterval(() => {
            setLoading(true);
            tweetService.getTweets(nextUrl)
                .then(response => {
                    setLoading(false);
                    nextUrl = response.search_metadata.next_results;
                    console.log(nextUrl);
                    firstResponse = [...response.statuses, ...firstResponse];
                    setTweets(firstResponse);
                });
        }, 10000);
        // works like componentWillUnmount
        return () => clearInterval(interval);
    };

    const handleHashChange = (e) => {
        setSearchHash(e.target.value);
        clearInterval();
    };

    return (
        <div className="container">
            <div className="page-header heading">
                <h1> Recent Tweets </h1>
            </div>
            <div className="search-cont">
                <div className="input-group input-group-lg">
                    <input
                        type="text" className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Search for a #"
                        value={searchHash}
                        onChange={handleHashChange}
                    />
                </div>
            </div>
            {
                loading ?
                    <div className="loader-cont">
                        <div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :
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
