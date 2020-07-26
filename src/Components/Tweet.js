import React from 'react';
import PropTypes from 'prop-types';

const TweetComponent = ({ tweet }) => {
    console.log(tweet);
    return (
        <>
            <div className="tweet-cont">
                <p> {tweet["full_text"]} </p>
            </div>
        </>
    );
};

TweetComponent.propTypes = {
    tweet: PropTypes.object
};

export default TweetComponent;
