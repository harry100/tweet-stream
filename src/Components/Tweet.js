import React from 'react';
import PropTypes from 'prop-types';

const TweetComponent = ({ tweet }) => {
    return (
        <>
            <div className="tweet-cont">
                <div className="user-cont">
                    <a href={`https://twitter.com/${tweet.user.screen_name}`} className="link-to-profile">
                        <img
                            className="display-picture"
                            src={tweet.user.profile_image_url}
                        />
                        <>
                            <span className="user-name"> {tweet.user.screen_name} </span>
                        </>
                    </a>
                </div>
                <p> {tweet["full_text"]} </p>
            </div>
        </>
    );
};

TweetComponent.propTypes = {
    tweet: PropTypes.object
};

export default TweetComponent;
